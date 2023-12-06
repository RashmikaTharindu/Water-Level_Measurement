#include <WiFi.h>
#include <WiFiClient.h>
#include <SPI.h>
#include <RF24.h>
#include <Arduino.h>
#include <FirebaseESP32.h>
#include <addons/TokenHelper.h>
#include <addons/RTDBHelper.h>

// Set the CE & CSN pins
#define CE_PIN 21   // GPIO21 on ESP32
#define CSN_PIN 22  // GPIO22 on ESP32

//DB details
#define API_KEY "AIzaSyAK2fkt8-NpheZTzftu4mnNikqqPDeYd9k"
#define DATABASE_URL "https://water-level-measurement-63b38-default-rtdb.asia-southeast1.firebasedatabase.app/"

//Project User's Details if needed
// #define USER_EMAIL "SachinViraj48@gmail.com"
// #define USER_PASSWORD "USER_PASSWORD"

//Address used to send/receive
const byte address[6] = "00005";

//Firebase Data objects
FirebaseData fbdo;
FirebaseAuth auth;
FirebaseConfig config;

// Create a Radio
RF24 radio(CE_PIN, CSN_PIN);

//WiFi credentials
const char *ssid = "Samsung j6";
const char *password = "123454321";

float text = 0.0;
float tankHeight = 1000.0;
bool isConnect = false;
bool signupOK = false;
unsigned long sendDataPrevMillis = 0;

void setup() {
  Serial.begin(115200);
  connectToWifi();
  radio.begin();
  radio.setDataRate(RF24_250KBPS);

  if (!radio.isChipConnected()) {
    Serial.println("Error: Radio not connected");
    while (1)
      ;  // Hang here if radio is not connected
  }

  radio.openReadingPipe(0, address);
  radio.setPALevel(RF24_PA_LOW);
  radio.startListening();
}

void loop() {
  if (radio.available()) {
    // float text = 0.0;
    radio.read(&text, sizeof(text));
    Serial.println(text);
    isConnect = true;
  } else {
    Serial.println("Not receiving data");
    isConnect = false;
  }
  if (isConnect) {
    firebaseCommunication(text);
  }

  delay(1000);
}


void connectToWifi() {

  WiFi.begin(ssid, password);
  Serial.print("Connecting to Wi-Fi");
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(300);
  }

  Serial.println();
  Serial.print("Connected with IP: ");
  Serial.println(WiFi.localIP());
  Serial.printf("Firebase Client v%s\n\n", FIREBASE_CLIENT_VERSION);

  config.database_url = DATABASE_URL;
  config.api_key = API_KEY;

  // Assign the user sign in credentials if needed
  // auth.user.email = USER_EMAIL;
  // auth.user.password = USER_PASSWORD;

  if (Firebase.signUp(&config, &auth, "", "")) {
    Serial.println("Sign up Successfull");
    signupOK = true;
  } else {
    Serial.printf("%s\n", config.signer.signupError.message.c_str());
    signupOK = false;
  }

  config.token_status_callback = tokenStatusCallback;
  Firebase.begin(&config, &auth);
}


void firebaseCommunication(float distance) {
  if (Firebase.ready() && signupOK && (millis() - sendDataPrevMillis > 15000 || sendDataPrevMillis == 0)) {
    sendDataPrevMillis = millis();
    Serial.printf("Set distance... %s\n", Firebase.setFloat(fbdo, F("/test/distance"), distance) ? "Successfully Added" : fbdo.errorReason().c_str());
    Serial.println();
    Serial.printf("Set percentage... %s\n", Firebase.setFloat(fbdo, F("/test/percentage"), (((tankHeight - distance) / tankHeight) * 100)) ? "Successfully Added" : fbdo.errorReason().c_str());
    Serial.println();
      
  }
}

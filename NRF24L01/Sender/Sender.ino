// #include <SPI.h> // for SPI communication

// #include <nRF24L01.h>

// #include <RF24.h>

// RF24 radio(9, 8); // CE, CSN

// const byte address[6] = "00005"; // the address the the module

// void setup() {
// Serial.begin(9600);
// radio.begin();
// radio.setDataRate(RF24_250KBPS);

// radio.openWritingPipe(address);

// radio.setPALevel(RF24_PA_HIGH);

// radio.stopListening();

// }

// void loop() {
// const float text = 1.85; // you can customize this text to your wish


// if (radio.write(&text, sizeof(text))) {
//     Serial.println("Transmission successful");
//   } else {
//     Serial.println("Transmission failed");
//   }
// delay(50);
// }



#include <SPI.h>
#include <nRF24L01.h>
#include <RF24.h>

RF24 radio(9, 8); // CE, CSN

const byte address[6] = "00005"; // the address of the module

void setup() {
  Serial.begin(9600);
  radio.begin();
  radio.setDataRate(RF24_250KBPS);
  radio.openWritingPipe(address);
  radio.setPALevel(RF24_PA_HIGH);
  radio.stopListening();
}

void loop() {
  // Read MaxSonar 7383 sensor value from analog pin A0
  int sensorValue = analogRead(A0);

  Serial.print("Sensor Reading: ");
  Serial.println(sensorValue);

  // Convert the analog sensor reading to a float if necessary
  float sensorReading = static_cast<float>(sensorValue);

  // Transmit the sensor reading
  if (radio.write(&sensorReading, sizeof(sensorReading))) {
    Serial.println("Transmission successful");
  } else {
    Serial.println("Transmission failed");
  }

  delay(50);
}

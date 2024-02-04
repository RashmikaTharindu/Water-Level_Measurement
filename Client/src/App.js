import React, { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from './firebase-config';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import PollIcon from '@mui/icons-material/Poll';
import OpacityIcon from '@mui/icons-material/Opacity';
import WavesIcon from '@mui/icons-material/Waves';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import SpeedIcon from '@mui/icons-material/Speed';
import Box from '@mui/material/Box';
import BasicTable from './BasicTable';
import WaterTankLevel from './WaterTankLevel';
import WaterTankHeightUpdater from './TankHeightUpdate';

function App() {
  const [reading, setReading] = useState({});
  const [pastData, setPastData] = useState([]);
  const [waterLevel, setWaterLevel] = useState(50); // Example initial water level

  const handleWaterLevelChange = (newWaterLevel) => {
    setWaterLevel(newWaterLevel);
  };
  let myArray = [];

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const testRef = ref(db, 'test/');
    onValue(testRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setReading(data);
        addValue(data);
      } 
    });
  };

  function addValue(newValue) {

    const formattedDate = new Date().toLocaleString();
    newValue.date = formattedDate;

    if (myArray.length ===5) {
      myArray.pop();
    }
    myArray.unshift(newValue);
    setPastData(myArray);

  }


  const iconAnimationProps = {
    opacity: 1,
    from: { opacity: 0 },
    reset: true,
  };

  return (
    <div className="App" style={{ backgroundColor: '#f0f0f0', minHeight: '100vh', display: 'flex', alignItems: 'center' }}>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={4}sx={{ display: 'flex', justifyContent: 'center' }}>
            <Card style={{ maxWidth: 400, width: '100%', margin: 20, borderRadius: 16, overflow: 'hidden', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
              <CardContent>
                <Grid container spacing={2} alignItems="center" justifyContent="center">
                  <Grid item xs={12}>
                    <Typography variant="h5" component="div" style={{ textAlign: 'center', marginBottom: 20, color: '#1976D2' }}>
                      <div style={{ ...iconAnimationProps }}>
                        <PollIcon style={{ fontSize: 40, verticalAlign: 'middle', marginRight: 10 }} />
                      </div>
                      Water Level Dashboard
                      <div style={{ ...iconAnimationProps }}>
                        <BeachAccessIcon style={{ fontSize: 40, verticalAlign: 'middle', marginLeft: 10 }} />
                      </div>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} style={{ textAlign: 'center' }}>
                    <Typography variant="h6" style={{ marginBottom: 10 }}>
                      Water Level Reading
                      <SpeedIcon style={{ fontSize: 20, verticalAlign: 'middle', marginLeft: 5, color: '#009688' }} />
                    </Typography>
                    <Typography variant="h4" style={{ color: '#009688', fontWeight: 'bold' }}>
                      {reading.distance || 'N/A'}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} style={{ textAlign: 'center', marginTop: 20 }}>
                    <Typography variant="h6" style={{ marginBottom: 10 }}>
                      Water Level Percentage
                      <OpacityIcon style={{ fontSize: 20, verticalAlign: 'middle', marginLeft: 5, color: '#E91E63' }} />
                    </Typography>
                    <Typography variant="h4" style={{ color: '#E91E63', fontWeight: 'bold' }}>
                      {reading.percentage || 'N/A'}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={12} md={8} >
            <Card style={{ maxWidth: 800, width: '100%', margin: 20, borderRadius: 16, overflow: 'hidden', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
              <CardContent>
                <Typography variant="h6" style={{ marginBottom: 10, textAlign: "center" }}>
                  Water Level History
                </Typography>
                <BasicTable rows={pastData} />
              </CardContent>
            </Card>
          </Grid>
        </Grid>

      {/* <WaterTankLevel waterLevel={waterLevel} /> */}
      {/* <WaterTankHeightUpdater /> */}

    </div>
  );
}

export default App;

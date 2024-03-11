<template>
    <!-- HEADDER===================================================================== -->
    <v-card >
      <v-layout style="background-color: #265073; min-height: 100vh; flex: auto;">
        <v-main style="height:auto; width: auto;">
          <v-card color="grey-lighten-4" flat height="auto" rounded="0" justify="center">
            <v-toolbar density="compact"
              style="background-color: #ECF4D6; color: #265073; height: 70px; padding-top: 10px;">
              <h2
                style="font-size: 30px; margin-left: 20px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; ">
                Home</h2>
              <v-spacer></v-spacer>
              <h3
                style="margin-right: 20px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; font-size: 40px;">
                {{ currentTime }}</h3>
            </v-toolbar>
          </v-card>
          <!-- HEADDER===================================================================== -->

          
            <v-col style="align-items: center; margin-left: 70px;">

              <v-row
                style="height: 550px; width: 1300px; align-items: top; background-color: #ECF4D6; justify-content: center;  border-radius: 50px; margin-top:40px; padding: 20px;"  >
                <v-col style="align-items: center; margin-top: 40px;"> <a
                    style="text-align: center; font-size:40px; margin: 60px; font-family: fantasy; color: #265073;">air
                    humidity</a>
                  <v-progress-circular :rotate="0" :size="300" :width="75" :model-value="value" color="#265073"
                    style="margin: 20px 20px 20px 20px; font-family: fantasy; font-size:40px;">
                    {{ value }} RH
                  </v-progress-circular>
                </v-col>


                <v-col style="align-items: center; margin-top: 40px;"> <a
                    style="text-align: center; font-size:40px; margin: 60px; font-family: fantasy;color: #265073;">temperature</a>
                  <v-progress-circular :rotate="0" :size="300" :width="75" :model-value="value2" color="#265073"
                    style="margin: 20px 20px 20px 20px; font-family: fantasy; font-size:40px;">
                    {{ value2 }} C
                  </v-progress-circular>
                </v-col>

                <v-col style="align-items: center; margin-top: 40px ;"> <a 
                    style="text-align: center; font-size:40px; margin: 90px; font-family: fantasy;color: #265073;">pH value</a>
                  <v-progress-circular :rotate="0" :size="300" :width="75" :model-value="value3" color="#265073"
                    style="margin: 20px 20px 20px 20px; font-family: fantasy; font-size:40px;">
                    {{ value3 }} pH
                  </v-progress-circular>
                </v-col >
              </v-row>
            </v-col>

        </v-main>
      </v-layout>
    </v-card>
  </template>
    
  <script>
    import mqtt from "mqtt";
  export default {
    setup() {

    },

    data() {
      return {
        year: 0,
        month: 0,
        day: 0,
        h25: 0,
        h24: 0,
        h23: 0,
        drawer: false,
        rail: true,
        value: 87.97,
        value2: 26.02,
        value3: 7.18,
        currentTime: "loading"
      };
    },

    beforeMount() {
      this.client = mqtt.connect("wss://broker.hivemq.com:8884/mqtt");
      console.log("connect_message/beforeMount=> ");
      console.log("on client connect");
      this.client.on("connect", () => {
        console.log("on client connect");
        this.client.subscribe("RC_status");
        this.client.subscribe("jtemp2");
        this.client.subscribe("jPH1");

      });
      this.client.on("message", (topic, message) => {
        if (topic === "RC_status") {
          //console.log("connect_message/temp1=>");
          // message is Buffer
          //  console.log("GOT:", message.toString());
          this.value = message.toString();
          // console.log("data=", this.value);
          // client.end()
        }
        if (topic === "jtemp2") {
          // console.log("connect_message/temp1=>");
          // message is Buffer
          // console.log("GOT:", message.toString());
          this.value2 = message.toString();
          //   console.log("data=", this.value);
          // client.end()
        }
        if (topic === "jPH1") {
          //  console.log("connect_message/cm=>");
          // message is Buffer
          // console.log("GOT:", message.toString());
          this.value3 = message.toString();
          //console.log("data=", this.value);
          // client.end()
        }

      });
    },


    methods: {
      getCurrentTime() {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');
        const day = now.getDate().toString().padStart(2, '0');
        const month = (now.getMonth() + 1).toString().padStart(2, '0');
        const year = now.getFullYear().toString();
        this.year = year;
        this.month = month;
        this.day = day;
        this.h25 = hours;
        this.h24 = minutes;
        this.h23 = seconds;
        this.currentTime = `${hours}:${minutes}:${seconds}`;
      },
      async token() {
        navigateTo("/checktoken")
      },
      async showdata() {
        navigateTo("/showdata")
      },
      async register() {
        navigateTo("/registerinapp")
      },
      async Logout() {
        localStorage.removeItem('token')
        navigateTo("/login")
      },
      bntSensor1() {
        this.client.publish("patt1", "1");
        console.log("sensor1");
      },
      bntSensor2() {
        this.client.publish("patt2", "0");
        console.log("sensor2");
      },
      async doSave() {
        console.log('save data')
        console.log(this.value)
        console.log(this.value2)
        console.log(this.h25 + ':' + this.h24 + ':' + this.h23)
        console.log(this.year + '-' + this.month + '-' + this.day)
        //http://localhost/7001/insert?name=username&passwd=password&dep=dep
        const url = 'http://localhost:7001/api/temp?date=' + this.year + '-' + this.month + '-' + this.day + '&time=' + this.h25 + ':' + this.h24 + ':' + this.h23 + '&temp=' + this.value2 + '&hemi=' + this.value+'%&ph='+this.value3 
        const res = await fetch(url);
        const data = await res.json()
        if (data.ok == 1) {
          console.log('save success');
          this.dialog = true
        } else {
          console.log('save fali');
          this.dialog_error = true
        }

      },
      setupInterval() {
        this.intervalId = setInterval(() => {
          this.doSave();
        }, 60000);
      },
      clearInterval() {
        clearInterval(this.intervalId);
      },
    },

    mounted() {
      this.getCurrentTime();
      this.intervalId = setInterval(() => {
        this.getCurrentTime();
      }, 1000);
      this.setupInterval();
    },
    beforeDestroy() {
      clearInterval(this.intervalId); 
    },

  };
  </script>
    
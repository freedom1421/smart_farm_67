<template>
    <!-- HEADDER===================================================================== -->
   <v-card>
       <v-layout style="background-color: #265073; min-height: 100vh;">
           <v-main style="height:auto; width: auto;">
               <v-card color="grey-lighten-4" flat height="auto" rounded="0" justify="center">
                   <v-toolbar density="compact"
                       style="background-color: #ECF4D6; color: #265073; height: 70px; padding-top: 10px;">
                       <h2
                           style="font-size: 30px; margin-left: 20px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; ">
                           Control Smart Farm</h2>
                       <v-spacer></v-spacer>
                   </v-toolbar>
               </v-card>
   <!-- HEADDER===================================================================== -->
<v-row style="align-items: end; justify-content: center; padding-left: 40px; top: 10px;">
               <v-col style="justify-items: center;">
                   <v-row
                       style="height: 500px; width: 430px; align-items: center; background-color: #ECF4D6; justify-content: center;  border-radius: 50px; margin: 50px  0px 0px 0px; padding: 10px;">
                       <v-btn size="300" variant="tonal" :color="lightColor" class="rounded-circle">
                           <v-icon size="60" :icon="isLight2On"></v-icon>
                       </v-btn>

                       <v-col cols="auto">
                           <v-btn
                               style="height: 60px; width: 150px; background-color: #199d12; color: #ffffff; border-radius: 50px;"
                               @click="bntSensor1">OPEN</v-btn>
                       </v-col>

                       <v-col cols="auto">
                           <v-btn
                               style="height: 60px; width: 150px; background-color: #9d1212; color: #ffffff; border-radius: 50px;"
                               @click="bntSensor2">CLOSE</v-btn>
                       </v-col>
                   </v-row>
               </v-col>
               <v-col style="justify-items: center;">
                   <v-row
                       style="height: 500px; width: 430px; align-items: center; background-color: #ECF4D6; justify-content: center;  border-radius: 50px; margin: 50px  0px 0px 0px; padding: 10px;">
                       <v-btn size="300" variant="tonal" :color="lightColor1" class="rounded-circle">
                           <v-icon size="60" :icon="isfan2On"></v-icon>
                       </v-btn>

                       <v-col cols="auto">
                           <v-btn
                               style="height: 60px; width: 150px; background-color: #199d12; color: #ffffff; border-radius: 50px;"
                               @click="bntSensor11">OPEN</v-btn>
                       </v-col>

                       <v-col cols="auto">
                           <v-btn
                               style="height: 60px; width: 150px; background-color: #9d1212; color: #ffffff; border-radius: 50px;"
                               @click="bntSensor21">CLOSE</v-btn>
                       </v-col>
                   </v-row>
               </v-col>
               <v-col style="justify-items: center;">
                   <v-row
                       style="height: 500px; width: 430px; align-items: center; background-color: #ECF4D6; justify-content: center;  border-radius: 50px; margin: 50px  0px 0px 0px; padding: 10px;">
                       <v-btn size="300" variant="tonal" :color="lightColor2" class="rounded-circle">
                           <v-icon size="60" :icon="isfog2On"></v-icon>
                       </v-btn>

                       <v-col cols="auto">
                           <v-btn
                               style="height: 60px; width: 150px; background-color: #199d12; color: #ffffff; border-radius: 50px;"
                               @click="bntSensor111">OPEN</v-btn>
                       </v-col>

                       <v-col cols="auto">
                           <v-btn
                               style="height: 60px; width: 150px; background-color: #9d1212; color: #ffffff; border-radius: 50px;"
                               @click="bntSensor211">CLOSE</v-btn>
                       </v-col>
                   </v-row>
               </v-col> 
</v-row>               
           </v-main>

       </v-layout>
   </v-card>
</template>

<script>
    import mqtt from "mqtt";
export default {


   data() {
       return {
           isLight2On: "mdi-engine-off",
           isfan2On: "mdi-fan-off",
           isfog2On: "mdi-cloud-off",
           lightColor: "grey-darken-4",
           lightColor1: "grey-darken-4",
           lightColor2: "grey-darken-4",           
           sensor1Value: "0",
           sensor2Value: "0",
           sensor21Value: "0",
           sensor11Value: "0",
       };
   },

   beforeMount() {
       this.client = mqtt.connect("wss://broker.hivemq.com:8884/mqtt");
       this.client.on("connect", () => {
           console.log("on client connect");
           this.client.subscribe("pum1");
           this.client.subscribe("pum2");
           this.client.subscribe("fan1");
           this.client.subscribe("fan2");
           this.client.subscribe("fog1");
           this.client.subscribe("fog2");
       });
       this.client.on("message", (topic, message) => {
           if (topic === "pum1") {
               this.sensor1Value = message.toString();
               console.log("sensor1Data=", this.sensor1Value);
               this.isLight2On = "mdi-engine";
               this.lightColor = "amber-darken-4";
           }
           if (topic === "pum2") {
               this.sensor2Value = message.toString();
               console.log("sensor2Data=", this.sensor2Value);
               this.isLight2On = "mdi-engine-off";
               this.lightColor = "grey-darken-4";
           }
           if (topic === "fan1") {
               this.sensor11Value = message.toString();
               console.log("sensor11Data=", this.sensor11Value);
               this.isfan2On = "mdi-fan";
               this.lightColor1 = "amber-darken-4";
           }
           if (topic === "fan2") {
               this.sensor21Value = message.toString();
               console.log("sensor21Data=", this.sensor21Value);
               this.isfan2On = "mdi-fan-off";
               this.lightColor1 = "grey-darken-4";
           }
           if (topic === "fog1") {
               this.sensor111Value = message.toString();
               console.log("sensor11Data=", this.sensor111Value);
               this.isfog2On = "mdi-cloud";
               this.lightColor2 = "amber-darken-4";
           }
           if (topic === "fog2") {
               this.sensor211Value = message.toString();
               console.log("sensor21Data=", this.sensor211Value);
               this.isfog2On = "mdi-cloud-off";
               this.lightColor2 = "grey-darken-4";
           }

       });
   },


   methods: {
       bntSensor1() {
           this.client.publish("pum1", "1");
           console.log("sensor ON");
       },
       bntSensor2() {
           this.client.publish("pum2", "0");
           console.log("sensor OFF");
       },
       bntSensor11() {
           this.client.publish("fan1", "1");
           console.log("sensor ON");
       },
       bntSensor21() {
           this.client.publish("fan2", "0");
           console.log("sensor OFF");
       },
       bntSensor111() {
           this.client.publish("fog1", "1");
           console.log("sensor ON");
       },
       bntSensor211() {
           this.client.publish("fog2", "0");
           console.log("sensor OFF");
       },
   },
}
</script>
 
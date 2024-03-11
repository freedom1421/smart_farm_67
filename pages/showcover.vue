<template>
    <!-- HEADDER===================================================================== -->
        <v-card>
            <v-layout style="background-color: #265073; min-height: 100vh;">
                <v-main style="height:auto; width: auto;">
                    <v-card color="grey-lighten-4" flat height="auto" rounded="0" justify="center">
                        <v-toolbar density="compact"
                            style="background-color: #ECF4D6; color: #265073; height: 70px; padding-top: 10px;">
                            <h2
                                style="font-size: 30px; padding-left: 20px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; ">
                                Show Report</h2>
                            <v-spacer></v-spacer>
                        </v-toolbar>
                    </v-card>
    <!-- HEADDER===================================================================== -->
                    <div style="--v-layout-left: 0px; ">
                        <v-data-table :headers="headers" :items="desserts" 
                            class="elevation-1" >
                        </v-data-table>
                    </div>
                </v-main>
            </v-layout>
        </v-card>
    </template>
    
    
    <script>
    export default {
        data: () => ({
            dialog: false,
            dialogDelete: false,
            headers: [
                { title: 'Date', key: 'Date' },
                { title: 'Time', key: 'Time' },
                { title: 'temperature', key: 'Temperature' },
                { title: 'humidity', key: 'Humidity' },
                { title: 'pH Value', key: 'pH_value' },
            ],
            desserts: [],
            
    
        }),
    
        created() {
            this.showdata()
        },
    
        methods: {
            async back() {
                navigateTo("/")
            },
            async showdata() {
                const url = 'http://localhost:7001/api/listcover';  
                const res = await fetch(url);
                const data = await res.json()
                this.desserts = data.datas.reverse();
                console.log('data=>', data.datas)
            },
        },
    }
    </script>   
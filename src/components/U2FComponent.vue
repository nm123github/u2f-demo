<template>
    <div class="hello">
        <button v-on:click="register()">Start Registration</button>
        <button v-on:click="login()">Start Login</button>
    </div>
</template>

<script>
    import axios from "axios";
    export default {
        name: "U2FComponent",
        methods: {
            register() {
                if(window.u2f && window.u2f.register) {
                    axios({ method: "GET", "url": "/register", withCredentials: true }).then(result => {
                        window.u2f.register(result.appId, [result], [], response => {
                            console.log(response);
                            axios({ method: "POST", "url": "/register", "data": { registerResponse: response }, "headers": { "content-type": "application/json" }, withCredentials: true }).then(result => {
                                console.log(result.data);
                            }, error => {
                                console.error(error);
                            });
                        });
                    }, error => {
                        console.error(error);
                    });
                } else {
                    console.error("U2F is not supported");
                }
            },
            login() {
                if(window.u2f && window.u2f.sign) {
                    axios({ method: "GET", "url": "/login", withCredentials: true }).then(result => {
                        window.u2f.sign(result.data.appId, result.data.challenge, [result.data], response => {
                            axios({ method: "POST", "url": "/login", "data": { loginResponse: response }, "headers": { "content-type": "application/json" }, withCredentials: true }).then(result => {
                                console.log(result.data);
                            });
                        });
                    });
                } else {
                    console.error("U2F is not supported");
                }
            }
        }
    }
</script>

<style scoped></style>
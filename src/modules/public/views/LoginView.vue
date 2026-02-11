<script setup>

import loginValidationSchema from '@/modules/public/schemas/loginValidationSchema'

import { Form, Field, ErrorMessage } from 'vee-validate'
import { reactive } from 'vue';
import { login, getUsuario } from '@/services/authService'

import Swal from 'sweetalert2';

import { useRouter } from 'vue-router'

const router = useRouter()


const datosUsuario = reactive({
    email: '',
    password: ''
})

const iniciarSesion = async () => {

    try {

        const resultado = await login(datosUsuario)
        const accessToken = resultado.access_token.token
        const refreshToken = resultado.refresh_token.token

        localStorage.setItem('accessToken', accessToken)
        localStorage.setItem('refreshToken', refreshToken)

        const informacionUsuario = await getUsuario()

        localStorage.setItem('informacionUsuario', JSON.stringify(informacionUsuario))

        Swal.fire({
            title: "¡Inicio de sesión exitoso!",
            text: "Bienvenido :" + informacionUsuario.email,
            icon: "success"
        });

        setTimeout(()=>{

            router.push('/admin')

        },2000)

    } catch (error) {

        Swal.fire({
            title: "¡Error!",
            text: "Usuario o contraseña incorrectos",
            icon: "error"
        });

    }

}




</script>

<template>
    <div class="page-header align-items-start min-vh-100"
        style="background-image: url('https://images.unsplash.com/photo-1497294815431-9365093b7331?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80');"
        loading="lazy">
        <span class="mask bg-gradient-dark opacity-6"></span>
        <div class="container my-auto">
            <div class="row">
                <div class="col-lg-4 col-md-8 col-12 mx-auto">
                    <div class="card z-index-0 fadeIn3 fadeInBottom">
                        <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                            <div class="bg-gradient-dark shadow-dark border-radius-lg py-3 pe-1">
                                <h4 class="text-white font-weight-bolder text-center mt-2 mb-0">Inciar Sesión</h4>
                                <div class="row mt-3">
                                    <div class="col-2 text-center ms-auto">
                                        <a class="btn btn-link px-3" href="javascript:;">
                                            <i class="fas fa-facebook text-white text-lg"></i>
                                        </a>
                                    </div>
                                    <div class="col-2 text-center px-1">
                                        <a class="btn btn-link px-3" href="javascript:;">
                                            <i class="fas fa-github text-white text-lg"></i>
                                        </a>
                                    </div>
                                    <div class="col-2 text-center me-auto">
                                        <a class="btn btn-link px-3" href="javascript:;">
                                            <i class="fas fa-google text-white text-lg"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="card-body">
                            <Form @submit="iniciarSesion" :validation-schema="loginValidationSchema" role="form"
                                class="text-start">

                                <label class="form-label">Correo:</label>
                                <div class="mb-1">
                                    <div class="input-group input-group-outline mb-0">
                                        <Field v-model="datosUsuario.email" type="email" class="form-control"
                                            name="email" />
                                    </div>
                                    <ErrorMessage name="email" class="text-danger small" />
                                </div>


                                <div class="mb-1">
                                    <label class="form-label">Contraseña</label>
                                    <div class="input-group input-group-outline mb-0">
                                        <Field v-model="datosUsuario.password" type="password" class="form-control"
                                            name="password" />
                                    </div>
                                    <ErrorMessage name="password" class="text-danger small" />

                                </div>

                                <div class="form-check form-switch d-flex align-items-center mb-3">
                                    <input class="form-check-input" type="checkbox" id="rememberMe" checked>
                                    <label class="form-check-label mb-0 ms-3" for="rememberMe">recuerdame</label>
                                </div>
                                <div class="text-center">
                                    <button type="submit" class="btn bg-gradient-dark w-100 my-4 mb-2">Iniciar
                                        Sesión</button>
                                </div>
                                <p class="mt-4 text-sm text-center">
                                    Olvidaste tu contraseña?
                                </p>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>

</template>
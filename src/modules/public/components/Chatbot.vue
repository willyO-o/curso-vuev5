<script setup>

import { ref } from 'vue'

import { Groq } from 'groq-sdk';



const groq = new Groq({
    apiKey: import.meta.env.VITE_GROQ_API_KEY, //importamos la apikjey que generamos 
    dangerouslyAllowBrowser: true, // permite usar groq en el navegador
})

const mensajes = ref([
    {
        role: "assistant",
        content: "Hola, soy tu asistente virtual. ¿En qué puedo ayudarte hoy?"
    }
])

const mensajeUsuario = ref('')


const enviarMensaje = async () => {
    if (mensajeUsuario.value.trim() == '') return

    mensajes.value.push({
        role: "user",
        content: mensajeUsuario.value
    })

    try {

        const respuesta = await groq.chat.completions.create({
            messages: mensajes.value,
            model: "openai/gpt-oss-120b",
            temperature: 0.7,
            max_tokens: 500,
        })

        mensajes.value.push({
            role: respuesta.choices[0].message.role,
            content: respuesta.choices[0].message.content
        })

        // console.log("respuesta de la ia", respuesta)


    } catch (error) {

        mensajes.value.push({
            role: "assistant",
            content: "Lo siento, ha ocurrido un error al procesar tu solicitud. Por favor, intenta nuevamente más tarde."
        })

        // console.error("Error al enviar el mensaje:", error)
    }

}






</script>


<template>

    <section class=" position-fixed end-0 bottom-0 z-index-3" style="width: 350px;">
        <div class="container py-5">

            <div class="row">
                <div class="col-md-12">

                    <div class="card">
                        <div class="card-header d-flex justify-content-between align-items-center p-3"
                            style="border-top: 4px solid #ffa900;">
                            <h5 class="mb-0">Chat messages</h5>
                            <div class="d-flex flex-row align-items-center">
                                <span class="badge bg-warning me-3">20</span>
                                <i class="fas fa-minus me-3 text-muted fa-xs"></i>
                                <i class="fas fa-comments me-3 text-muted fa-xs"></i>
                                <i class="fas fa-times text-muted fa-xs"></i>
                            </div>
                        </div>
                        <div class="card-body overflow-y-auto" data-mdb-perfect-scrollbar-init
                            style="position: relative; height: 400px">

                            <div 
                                v-for="(msj, index) in mensajes" :key="index">
                                <div class="d-flex justify-content-between">
                                    <p class="small mb-1">{{ msj.role != "user" ? "Asistente" : "Tu" }}</p>
                                    <p class="small mb-1 text-muted">23 Jan 2:00 pm</p>
                                </div>
                                <div 
                                :class="{'justify-content-start': msj.role == 'assistant',
                                    'justify-content-end': msj.role == 'user'
                                }"
                                class="d-flex flex-row ">
                                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava5-bg.webp"
                                        alt="avatar 1" style="width: 45px; height: 100%;">
                                    <div>
                                        <p 
                                         :class="{'bg-body-tertiary': msj.role == 'assistant',
                                            'bg-warning': msj.role == 'user'
                                        }"
                                        class="small p-2 ms-3 mb-3 rounded-3 ">
                                            {{ msj.content }}
                                        </p>
                                    </div>
                                </div>

                                <!-- <div class="d-flex justify-content-between">
                                    <p class="small mb-1 text-muted">23 Jan 2:05 pm</p>
                                    <p class="small mb-1">Johny Bullock</p>
                                </div>
                                <div class="d-flex flex-row justify-content-end mb-4 pt-1">
                                    <div>
                                        <p class="small p-2 me-3 mb-3 text-white rounded-3 bg-warning">Thank you for
                                            your
                                            believe in
                                            our
                                            supports</p>
                                    </div>
                                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp"
                                        alt="avatar 1" style="width: 45px; height: 100%;">
                                </div> -->


                            </div>


                        </div>
                        <div class="card-footer text-muted d-flex justify-content-start align-items-center p-3">
                            <div class="input-group mb-0">
                                <input type="text" class="form-control" placeholder="Escribe tu consulta"
                                    v-model="mensajeUsuario" aria-label="Recipient's username"
                                    aria-describedby="button-addon2" />
                                <button @click="enviarMensaje" data-mdb-button-init data-mdb-ripple-init
                                    class="btn btn-warning" type="button" id="button-addon2"
                                    style="padding-top: .55rem;">
                                    Button
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    </section>


</template>
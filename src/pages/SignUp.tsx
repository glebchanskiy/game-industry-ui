
import { FunctionalComponent } from "preact";
import { useRef } from "preact/hooks";
import { getFormField } from "../utils";
import { apiClient } from "../api/client";
import Cookies from "js-cookie";
import { route } from "preact-router";


export const SignUp: FunctionalComponent = () => {
    const formRef = useRef<HTMLFormElement>(null)

    const onSignUpSubmit = (e: SubmitEvent) => {
        e.preventDefault()

        if (!formRef.current) return

        const email = getFormField('email', formRef)
        const username = getFormField('username', formRef)
        const password = getFormField('password', formRef)


        const signUpData = {
            email,
            username,
            password
        }

        apiClient.authSignUp(signUpData).then(response => {
            Cookies.set('token', response.data.accessToken)
            route('/tables')
            location.reload()
        })
    }

    return (
        <div class="mx-auto mt-10 w-96 p-6 space-y-4 md:space-y-6 sm:p-8 0 bg-table rounded-lg">
            <h1 class="text-xl font-bold leading-tight tracking-tight  md:text-2xl ">
                Регистрация
            </h1>
            <form ref={formRef} onSubmit={onSignUpSubmit} class="space-y-4 md:space-y-6" action="#">
                <div>
                    <label for="email" class="block mb-2 text-sm font-medium  ">Ваша почта</label>
                    <input type="email" name="email" id="email" class=" border focus:!outline-none transition-this sm:text-sm rounded-lg  block w-full p-2.5 bg-secondary border-gray-600 placeholder-gray-400  focus:ring-blue-500 focus:border-blue-500" placeholder="name@company.com" required />
                </div>

                <div>
                    <label for="username" class="block mb-2 text-sm font-medium ">Имя пользователя</label>
                    <input type="text" name="username" id="text" class=" border focus:!outline-none transition-this sm:text-sm rounded-lg  block w-full p-2.5 bg-secondary border-gray-600 placeholder-gray-400  focus:ring-blue-500 focus:border-blue-500" placeholder="имя..." required />
                </div>

                <div>
                    <label for="password" class="block mb-2 text-sm font-medium  ">Пароль</label>
                    <input type="password" name="password" id="password" placeholder="••••••" class=" border focus:!outline-none transition-this sm:text-sm rounded-lg  block w-full p-2.5 bg-secondary border-gray-600 placeholder-gray-400  focus:ring-blue-500 focus:border-blue-500" required />
                </div>


                <button type="submit" class="w-full  bg-primary-600 transition-this focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Создать</button>

                <p class="text-sm font-light ">
                   Уже имеется аккаунт? <a href="/login" class="font-medium hover:underline text-primary transition-this">Войти</a>
                </p>
            </form>
        </div>
    )
}
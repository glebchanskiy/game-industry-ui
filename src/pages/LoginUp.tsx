
import { FunctionalComponent } from "preact";
import { useRef } from "preact/hooks";
import { getFormField } from "../utils";
import { apiClient } from "../api/client";
import Cookies from "js-cookie";
import { route } from "preact-router";


export const Login: FunctionalComponent = () => {
    const formRef = useRef<HTMLFormElement>(null)

    const onLoginSubmit = (e: SubmitEvent) => {
        e.preventDefault()

        if (!formRef.current) return

        const email = getFormField('email', formRef)
        const password = getFormField('password', formRef)


        const loginData = {
            email,
            password
        }

        apiClient.authLogin(loginData).then(response => {
            Cookies.set('token', response.data.accessToken)
            route('/tables')
            location.reload()
        })
    }

    return (
        <div class="mx-auto mt-10 w-96 p-6 space-y-4 md:space-y-6 sm:p-8 0 bg-table rounded-lg">
            <h1 class="text-xl font-bold leading-tight tracking-tight  md:text-2xl ">
                Вход
            </h1>
            <form ref={formRef} onSubmit={onLoginSubmit} class="space-y-4 md:space-y-6" action="#">

                <div>
                    <label for="email" class="block mb-2 text-sm font-medium  ">Ваша почта</label>
                    <input type="email" name="email" id="email" class=" border focus:!outline-none transition-this sm:text-sm rounded-lg  block w-full p-2.5 bg-secondary border-gray-600 placeholder-gray-200  focus:ring-blue-500 focus:border-blue-500" placeholder="name@company.com" required />
                </div>

                <div>
                    <label for="password" class="block mb-2 text-sm font-medium  ">Ваш пароль</label>
                    <input type="password" name="password" id="password" placeholder="••••••" class=" border focus:!outline-none transition-this sm:text-sm rounded-lg  block w-full p-2.5 bg-secondary border-gray-600 placeholder-gray-200  focus:ring-blue-500 focus:border-blue-500" required />
                </div>


                <button type="submit" class="w-full  bg-primary focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-this">Войти</button>

                <p class="text-sm font-light ">
                    Ещё нет аккаунта? <a href="/signup" class="font-medium hover:underline text-primary transition-this">Зарегистрироваться</a>
                </p>
            </form>
        </div>
    )
}
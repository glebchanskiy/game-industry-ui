import { FunctionalComponent } from "preact"
import { ApiUser } from "../api"

export const UserProfile: FunctionalComponent<{ onClick?: () => void, user: ApiUser }> = ({ onClick, user }) => {
    return (
        <div onClick={onClick} class='flex gap-5 items-center cursor-pointer'>
            <span class='block text-[36px]'>{user.username}</span>
            <img class='h-20 rounded-full bg-secondary p-1' src={user.role === 'ROLE_ADMIN' ? '/src/assets/admin.jpeg' : '/src/assets/user.jpg'} alt="userpicture" />
        </div>
    )
}
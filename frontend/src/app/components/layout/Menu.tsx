import { logout } from "@/store/slices/authSlice";
import { useDispatch, useSelector } from "@/store/types";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Menu(): JSX.Element {
    const dispatch = useDispatch();
    const router = useRouter();
    const { userId } = useSelector((state) => state.auth)

    const handleLogout = () => {
        if (userId) {
            dispatch(logout());
            router.push('/');
        }
    }

    return (
        <ul className="navigation">
            <li>
                <Link href="/">Home</Link>
            </li>
            <li>
                <Link href="/recipes/create">Add NewRecipe</Link>
            </li>
            <li onClick={handleLogout}>
                <Link href={userId ? '' : '/login'}>
                    {userId ? "Logout" : "Login"}
                </Link>
            </li>
        </ul>
    );
}

import Link from "next/link"
import { Button } from "./ui/button"

const GoToHome = () => {
    return (
        <Link href={'/'}>
            <Button variant={"outline"}>
                صفحه اصلی
            </Button>
        </Link>
    )
}

export default GoToHome
// app/page.js
import AuthLayout from "@/components/auth/AuthLayout"
import AuthSwitcher from "@/components/auth/AuthSwitcher"

export default function HomePage() {
  return (
    <AuthLayout>
      <AuthSwitcher />
    </AuthLayout>
  )
}

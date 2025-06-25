// app/page.js
import AuthLayout from "@/components/auth/authlayout"
import AuthSwitcher from "@/components/auth/authswitcher"

export default function HomePage() {
  return (
    <AuthLayout>
      <AuthSwitcher />
    </AuthLayout>
  )
}

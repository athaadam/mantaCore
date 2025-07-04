// app/page.js
'use client'
import { useState } from 'react';
import AuthForm from '@/components/form/AuthForm'; // Assuming this is the correct path to your
export default function Page() {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <div className="flex h-screen w-full font-['Segoe_UI']">
      {/* Kiri: Branding */}
      <div
        className="w-[75%] bg-[#6A5ACD] text-white flex flex-col justify-between p-[60px] relative"
        style={{
          backgroundImage: 'url(/erp.gif)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundBlendMode: 'overlay',
        }}
      >
        <h1 className="text-[3rem] font-bold">
          Empowering Your<br />Business Workflow
        </h1>
        <div className="absolute left-[40px] bottom-[40px] flex items-center">
          <img src="/logo.png" alt="MantaCore Logo" className="w-[200px] h-auto block" />
        </div>
      </div>

      {/* Kanan: Form login/register */}
      <div className="w-[25%] bg-white flex items-center justify-center rounded-tl-[20px] rounded-bl-[20px] shadow-[-10px_0_30px_rgba(0,0,0,0.1)] overflow-hidden relative">
        <div className="w-full flex transition-all duration-300 ease-in-out">
          <AuthForm
            mode={isLogin ? 'login' : 'register'}
            onSwitch={() => setIsLogin(!isLogin)}
          />
        </div>
      </div>
    </div>
  )
}

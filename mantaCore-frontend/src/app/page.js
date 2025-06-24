import Script from 'next/script'



export default function Home() {
  return (

    <>
      <Script src="/assets/js/index.js" strategy="afterInteractive" />

      <div className="flex h-screen w-full font-['Segoe_UI']">
        <div className="w-[75%] bg-[#6A5ACD] text-white flex flex-col justify-between p-[60px] relative">
          <h1 className="text-[3rem] font-bold">
            Empowering Your<br />Business Workflow
          </h1>
          <div className="absolute left-[40px] bottom-[40px] flex items-center">
            <img src="/logo.png" alt="MantaCore Logo" className="w-[200px] h-auto block" />
          </div>
        </div>

        <div className="w-[25%] bg-white flex items-center justify-center rounded-tl-[20px] rounded-bl-[20px] shadow-[-10px_0_30px_rgba(0,0,0,0.1)] overflow-hidden relative">
          <div className="w-full flex transition-transform duration-500 ease-in-out translate-x-0" id="formWrapper">
            {/* LOGIN FORM */}
            <div className="flex flex-col w-full flex-shrink-0 text-center" id="loginForm">
              <h2 className="text-[#6A5ACD] text-[4rem] mb-[60px]">Sign In</h2>
              <form className="flex flex-col gap-[15px]" navigate="/dashboard">
                <input type="text" placeholder="Username" required className="text-base self-center w-[70%] p-[10px] border border-gray-300 rounded-[6px]" />
                <input type="password" placeholder="Password" required className="text-base self-center w-[70%] p-[10px] border border-gray-300 rounded-[6px]" />
                <button type="submit" className="mt-[20px] self-center w-[30%] p-[10px] bg-[#6A5ACD] text-white border-none rounded-[6px] text-[1.2rem] cursor-pointer transition hover:bg-[#5a4ac5] font-medium">
                  Login
                </button>
              </form>
              <a href="#" className="mt-[20px] text-sm text-[#362B6D] hover:text-[#211a42] font-medium">Forgot password?</a>
              <p className="mt-[70px] text-sm text-gray-800">
                Doesn’t have an account? <a href="#" id="showRegister" className="text-[#6A5ACD] font-semibold hover:text-[#362B6D]">Create now</a>
              </p>
            </div>

            {/* REGISTER FORM */}
            <div className="flex flex-col w-full flex-shrink-0 text-center" id="registerForm">
              <h2 className="text-[#6A5ACD] text-[4rem] mb-[60px]">Register</h2>
              <form className="flex flex-col gap-[15px]">
                <input type="text" placeholder="Username" required className="text-base self-center w-[70%] p-[10px] border border-gray-300 rounded-[6px]" />
                <input type="password" placeholder="Password" required className="text-base self-center w-[70%] p-[10px] border border-gray-300 rounded-[6px]" />
                <input type="password" placeholder="Confirmation Password" required className="text-base self-center w-[70%] p-[10px] border border-gray-300 rounded-[6px]" />
                <input type="email" placeholder="Email" required className="text-base self-center w-[70%] p-[10px] border border-gray-300 rounded-[6px]" />
                <input type="text" placeholder="Company Name" className="text-base self-center w-[70%] p-[10px] border border-gray-300 rounded-[6px]" />
                <button type="submit" className="mt-[20px] self-center w-[30%] p-[10px] bg-[#6A5ACD] text-white border-none rounded-[6px] text-[1.2rem] cursor-pointer transition hover:bg-[#5a4ac5] font-medium">
                  Register
                </button>
              </form>
              <p className="mt-[70px] text-sm text-gray-800">
                Already have an account? <a href="#" id="showLogin" className="text-[#6A5ACD] font-semibold hover:text-[#362B6D]">Login here</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

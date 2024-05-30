import { useState,useCallback,useEffect,useRef} from 'react'

function App() {
  const [length, setlength] = useState(8)
  const [Number, setNumber] = useState(false);
  const [Charcter, setCharcter] = useState(false);
  const [Password, setPassword] = useState("")
  //useRef hook
  const passwordRef=useRef(null) 
  const PasswordGenerator= useCallback(()=>{
    let pass=" "
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (Number) {
      str+="0123456789"
    }
    if (Charcter) {
      str+="!@#$%^&*()_+{[]-=~`}"
    }
    for (let i = 1; i <length; i++) {
      let char=Math.floor(Math.random()*str.length+1)
      pass +=str.charAt(char)
      
    }
    setPassword(pass)

  },[length,Number,Charcter,setPassword])

  const copyPasswordToClipboard=useCallback(()=>{
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0,100);
    window.navigator.clipboard.writeText(Password)
  },[Password])

 useEffect(()=>{
  PasswordGenerator()
},[length,Number,Charcter,setPassword])
  return (
    <>
    <h1 className='text-4xl text-center pt-20 text-white'>Password_Generator</h1>

    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4  my-8 text-orange-500  bg-gray-700">
     <div className="flex shadow rounded-lg overflow-hidden mb-4 py-14">
      <input type='text'
      value={Password}
      className='outline-none w-full py-1 px-3 '
      placeholder='password'
      readOnly
      ref={passwordRef}></input>
      <button
      onClick={copyPasswordToClipboard
      }
      className='outline-none bg-blue-700 hover:bg-[#7872c2] hover:text-black text-white px-3 py-0.5 shrink-0'>Copy</button>
     </div>
     <div className="flex items-center gap-x-1">
      <input type='range'
      min={8}
      max={100}
      value={length}
      className='cursor-pointer'
      onChange={(e)=>{setlength(e.target.value)}}/>
      <label>length:{length}</label>
     </div>
     <div className="flex items-center gap-x-1">
      <input type="checkbox"
      defaultValue={Number}
      id='number'
      onChange={(e)=>{setNumber((prev)=>!prev)
      }}/>
      <label htmlFor='number'>Number:{Number}</label>
     </div>
     <div className="flex items-center gap-x-1">
      <input type="checkbox"
      defaultValue={Charcter}
      id='character'
      onChange={(e)=>{setCharcter((prev)=>!prev)
      }}/>
      <label htmlFor='charcter'>Charcter:{Charcter}</label>
     </div>
    </div>
     
    </>
  )
}

export default App

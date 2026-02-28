
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {
    const user = JSON.parse(localStorage.getItem("user"))
    const navigate = useNavigate(); 
    const handleLogout = ()=>{
        localStorage.removeItem("user"); 
        navigate("/login")
    }
  return (
    <div>
        <nav className='bg-white p-4 rounded-lg shadow-sm border border-gray-100 mb-8 flex justify-between items-center'>
            <Link to="/" className='text-2xl font-bold text-indigo-600' >BlogPlatform</Link>
            <div className='flex items-center gap-4'>
                {!user? (<>
                  <Link to="/login" className='text-gray-600 hover:text-indigo-600 font-medium' >Login</Link>
                  <Link to="/signup" className='text-gray-600 hover:text-indigo-600 font-medium' > Sign Up </Link>
                </>): (<> <span>Hello, {user.name} ({user.role}) </span> 
                <button onClick={handleLogout} > Logout </button> </> ) }
            </div>
        </nav>
    </div>
  )
}

export default Navbar
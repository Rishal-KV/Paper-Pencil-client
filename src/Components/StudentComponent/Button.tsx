
function Button({description,title}:any) {
  return (
    <div>
        <button   className='hover:text-black btn lg:btn-lg  bg-blue-500 text-white'><p className='font-medium'>{description}</p>{title}</button>
    </div>
  )
}

export default Button
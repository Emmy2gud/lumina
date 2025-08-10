import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { MoreHorizontal, MoreVertical, PenBox, Trash,BookPlus } from 'lucide-react'
import {Link,useForm} from '@inertiajs/react'

export default function SectionDropdown({course}) {
 console.log(course)

  const {delete:destroy}=useForm();

  function submit(e) {
    e.preventDefault();
   destroy(``)
}


  return (
    <Menu as="div" className={' z-10 inline-block mb-2 md:absolute bottom-56'}>
      <div>
        <MenuButton className="inline-flex w-full justify-center border-0 gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900  hover:bg-gray-50">

          <MoreVertical  aria-hidden="true" className="-mr-1 size-5 text-gray-400 md:text-primary" />
        </MenuButton>
      </div>

      <MenuItems
        transition
        className=" md:absolute md:right-0  mt-2 w-40 origin-top-right rounded-md bg-white ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
      >
        <div className="py-1 ">
          <MenuItem>
            <Link
              href={``}
              className="flex px-4 py-2 text-sm font-semibold text-primary-500 data-focus:bg-gray-100  data-focus:outline-hidden  hover:bg-primary-300 hover:text-primary-500"
            >
        <PenBox className='h-5 w-5 mr-1 opacity-80'/>  Edit
            </Link>
          </MenuItem>

          <form onSubmit={submit}>
            <MenuItem>
              <button

                className="flex w-full px-4 py-2 text-sm text-red-600 text-left font-semibold   data-focus:outline-hidden hover:bg-red-300 hover:text-red-900"


              >
                 <Trash className='h-5 w-5 mr-1 opacity-80'/>  Delete
              </button>
            </MenuItem>

          </form>
{course.map((course)=>

<Link
href={`/courses/${course.id}/sections/create`}
className="flex px-4 py-2 text-sm font-semibold text-primary-500 data-focus:bg-gray-100  data-focus:outline-hidden  hover:bg-soft-purple hover:text-white"
>
<BookPlus className='h-5 w-5 mr-1 opacity-80'/>  Add section
</Link>)
}



        </div>
      </MenuItems>
    </Menu>
  )
}

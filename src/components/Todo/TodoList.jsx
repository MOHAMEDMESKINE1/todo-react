import { useEffect, useState } from "react";
import TodoApi from "../../Api/TodoApi";
import Swal from 'sweetalert2';
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const TodoList = () => {
    const [todos,setTodos] = useState([])
    const [searchTerm, setSearchTerm] = useState('');
    const [completedFilter, setCompletedFilter] = useState('all');
   
   
  const getTodos =async ()=>{
        const todos  =await  TodoApi.getAll()
        setTodos(todos)
    }
  
    const filteredTodos = todos.filter((todo) =>
     {
        if (completedFilter === 'all') {
            return todo.title.toLowerCase().includes(searchTerm.toLowerCase());
          } else if (completedFilter === 'true') {
            return todo.completed && todo.title.toLowerCase().includes(searchTerm.toLowerCase());
          } else {
            return !todo.completed && todo.title.toLowerCase().includes(searchTerm.toLowerCase());
          }
     }
    );

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleFilterChange = (e) => {
        setCompletedFilter(e.target.value);
      };
   

    const handleDelete =  (e) => {
        e.preventDefault();
        const id  = parseInt(e.currentTarget.dataset.id);

        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this data!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
          }).then((result) => {

            if (result.isConfirmed) {

             TodoApi.delete(id).then(_=>{
                // refresh data 
                   setTodos(prevState => prevState.filter(todo =>todo.id!== id))

                   Swal.fire('Deleted!', 'Your data has been deleted.', 'success');
                }).catch(error => {
                    console.error('Error deleting todo:', error);
                    // Handle error if needed
                });
                
            }else{
              toast('todo  cancelled',{
                theme: "dark"
              })
            }
          
          });
    }
    
    useEffect(()=>{
        getTodos()
    },[])
    return ( 
    
            
<div class="relative overflow-x-auto shadow-md rounded-lg m-10">
        <div class="flex items-center justify-between pb-4 bg-white dark:bg-gray-900">
                  
         {/* search by title */}
        <label for="table-search" class="sr-only">Search</label>
            <div class="relative">
                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                    </svg>
                </div>
                <input type="text"  placeholder="Search todos"
                                    value={searchTerm}
                                    onChange={handleSearch}
                                    id="table-search-users" class="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "/>
            </div>

            {/* filter by status */}
            <div>                
                <select id="countries" value={completedFilter} onChange={handleFilterChange} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option selected disabled>Status</option>
                <option value="all">All Todos</option>
                <option value='true'>Completed</option>
                <option value='false'>Not Completed</option>
                </select>

            </div>
           
        </div>
        <table class="w-full text-sm text-center text-gray-500 dark:text-gray-400">
            <caption class="p-5 text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800">
                Our Todos
                <p class="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">Browse a list of todos and more.</p>
            </caption>
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    
                    <th scope="col" class="px-6 py-3">
                        # Id
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Title
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Completed
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Action
                    </th>
                </tr>
            </thead>
            <tbody>
                    {   
                      todos && filteredTodos.map((todo,key)=>{
                            return  <tr  class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                   
                                                <td key={key} class="px-6 py-4">
                                                    {todo.id}
                                                </td>
                                                <td class="px-6 py-4">
                                                    {todo.title}
                                                </td>
                                                <td class="px-6 py-4">
                                                    <div class="flex items-center justify-center">
                                                        {
                                                            todo.completed ?
                                                            <div class="h-3.5 w-3.5 rounded-full  bg-green-500 mr-2"></div> 
                                                            :
                                                            <div class="h-3.5 w-3.5  rounded-full bg-red-500 mr-2"></div> 
                                                        }
                                                    </div>
                                                </td>
                                                <td class="px-6 py-4">
                                                <Link to={`/todo/update/${todo.id}`} class="font-medium bg-blue-600 p-1.5 text-white mr-1 ">Edit </Link>
                                                <button data-id={todo.id}  onClick={handleDelete} class="font-medium bg-red-600 p-1.5 rounded-sm text-white  ">Delete</button>
                            
                                                </td>
                                    </tr>
                        })
                    }
                
               
            </tbody>
        </table>
        <ToastContainer  draggablePercent={60} />
    <div/> 


</div>
    );
}
 
export default TodoList;
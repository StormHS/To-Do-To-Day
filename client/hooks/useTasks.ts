// import {
//   useQuery,
//   useMutation,
//   useQueryClient,
//   MutationFunction,
// } from '@tanstack/react-query'
// import { getTasks } from '../apis/tasks'

// export function useTasks() {
//   const query = useQuery(['tasks'], getTasks)
//   return {
//     ...query,
// Extra queries go here e.g. addTask: useAddTask()
//   }
// }

// function useTasksMutation<TData = unknown, TVariables = unknown>(
//   mutationFn: MutationFunction<TData, TVariables>
// ) {
//   const queryClient = useQueryClient()
//   const mutation = useMutation(mutationFn, {
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['tasks'] })
//     },
//   })
// }

//   return mutation
// }

// Query functions go here e.g. useAddTask
/* function useAddTask() {
  return useTasksMutation(addTask)
} */

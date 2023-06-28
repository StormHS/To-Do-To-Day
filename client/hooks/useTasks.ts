// import {
//   useQuery,
//   useMutation,
//   useQueryClient,
//   MutationFunction,
// } from '@tanstack/react-query'
// import { gettasks } from '../apis/tasks'

// export function usetasks() {
//   const query = useQuery(['tasks'], gettasks)
//   return {
//     ...query,
//     // Extra queries go here e.g. addtask: useAddtask()
//   }
// }

// function usetasksMutation<TData = unknown, TVariables = unknown>(
//   mutationFn: MutationFunction<TData, TVariables>
// ) {
//   const queryClient = useQueryClient()
//   const mutation = useMutation(mutationFn, {
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['tasks'] })
//     },
//   })

//   return mutation
// }

// // Query functions go here e.g. useAddtask
// /* function useAddtask() {
//   return usetasksMutation(addtask)
// } */

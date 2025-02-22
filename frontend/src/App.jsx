import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createBrowserRouter, RouterProvider } from 'react-router';

import Landing from './pages/Landing';
import Similarity from './pages/Similarity';

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    errorElement: <h1>There was a problem!</h1>,
    children: [
      { index: true, element: <Landing /> },
      {
        path: '/similarity/:jobId',
        element: <Similarity />,
      },
    ],
  },
]);

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};

export default App;


import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardLayout from "./layouts/DashboardLayout";
import Index from "./pages/Index";
import SignIn from "./pages/SignIn";
import Analytics from "./pages/protected/Analytics";
import Members from "./pages/protected/Members";
import Messaging from "./pages/protected/Messaging";
import Network from "./pages/protected/Network";
import Subscriptions from "./pages/protected/Subscriptions";
import MyProfile from "./pages/protected/MyProfile";
import JoinRequests from "./pages/protected/JoinRequests";
import Notifications from "./pages/protected/Notifications";
import Networks from "./pages/protected/Networks";
import NotFound from "./pages/NotFound";
import CompanyDetails from "./pages/protected/CompanyDetail";
import MemberDetails from "./pages/protected/MemberDetails";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/signup" element={<Index />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/" element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }>
              <Route index element={<Navigate to="/analytics" replace />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="members" element={<Members />} />
              <Route path="members/:id" element={<MemberDetails />} />
              <Route path="company-details/:id" element={<CompanyDetails />} />
              <Route path="messaging" element={<Messaging />} />
              <Route path="network" element={<Network />} />
              <Route path="subscriptions" element={<Subscriptions />} />
              <Route path="join-requests" element={<JoinRequests />} />
              <Route path="notifications" element={<Notifications />} />
              <Route path="networks" element={<Networks />} />
              <Route path="my-profile" element={<MyProfile />} />
            </Route>
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;

import React, { useState } from 'react';
import { 
  Home, 
  BookOpen, 
  MessageCircle, 
  Info, 
  Phone, 
  User, 
  ShoppingCart,
  PlayCircle,
  Award,
  Book,
  Star,
  CheckCircle,
  Users,
  LogOut
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const ClassAcademy = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
      toast.success('Successfully signed out');
    } catch (error) {
      toast.error('Failed to sign out');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-md fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0 flex items-center">
              <h1 className="text-2xl font-bold text-olive-600">Class Academy</h1>
            </div>
            
            <div className="hidden md:flex space-x-8">
              <NavLink active={currentPage === 'home'} onClick={() => setCurrentPage('home')}>
                <Home className="w-4 h-4 mr-1" />
                Home
              </NavLink>
              <NavLink active={currentPage === 'courses'} onClick={() => setCurrentPage('courses')}>
                <BookOpen className="w-4 h-4 mr-1" />
                Courses
              </NavLink>
              <NavLink active={currentPage === 'testimonials'} onClick={() => setCurrentPage('testimonials')}>
                <MessageCircle className="w-4 h-4 mr-1" />
                Testimonials
              </NavLink>
              <NavLink active={currentPage === 'about'} onClick={() => setCurrentPage('about')}>
                <Info className="w-4 h-4 mr-1" />
                About Us
              </NavLink>
              <NavLink active={currentPage === 'contact'} onClick={() => setCurrentPage('contact')}>
                <Phone className="w-4 h-4 mr-1" />
                Contact
              </NavLink>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="flex items-center text-gray-600 hover:text-olive-600">
                <User className="w-5 h-5" />
              </button>
              <button className="flex items-center text-gray-600 hover:text-olive-600">
                <ShoppingCart className="w-5 h-5" />
              </button>
              <button 
                onClick={handleSignOut}
                className="flex items-center text-gray-600 hover:text-olive-600"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Rest of the component remains the same, just update color classes from indigo to olive */}
      {/* ... */}
    </div>
  );
};

// Helper Components
const NavLink = ({ children, active, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
      active 
        ? 'text-olive-600 bg-olive-50' 
        : 'text-gray-600 hover:text-olive-600 hover:bg-olive-50'
    }`}
  >
    {children}
  </button>
);

export default ClassAcademy;
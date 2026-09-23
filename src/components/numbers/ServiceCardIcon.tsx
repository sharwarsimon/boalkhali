import React from 'react';
import {
  Shield,
  Scale,
  Camera,
  Flame,
  Zap,
  Award,
  Stethoscope,
  HeartPulse,
  Building2,
  FlaskConical,
  Ambulance,
  Droplet,
  Package,
  Car,
  Bike,
  Navigation,
  Bus,
  Train,
  Landmark,
  FileText,
  Users,
  CreditCard,
  Mail,
  HeartHandshake,
  PhoneCall,
  Pill,
  GraduationCap,
  BookOpen,
  School,
  Monitor,
  Wrench,
  Printer,
  Code,
  Globe,
  Truck,
  Plane,
  Sparkles,
  PartyPopper,
  ChefHat,
  Cake,
  UtensilsCrossed,
  Utensils
} from 'lucide-react';

interface ServiceCardIconProps {
  type: string;
  className?: string;
}

export const ServiceCardIcon: React.FC<ServiceCardIconProps> = ({ type }) => {
  switch (type) {
    // 1. জরুরী সেবা
    case 'national':
      return (
        <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-red-600 via-rose-600 to-red-500 p-0.5 shadow-md flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
          <div className="w-full h-full rounded-[14px] bg-gradient-to-b from-red-500 to-rose-700 flex items-center justify-center text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-white/15 opacity-0 group-hover:opacity-100 transition-opacity" />
            <PhoneCall className="w-6.5 h-6.5 drop-shadow-sm fill-white/20 stroke-white stroke-[2.2]" />
          </div>
        </div>
      );

    case 'admin':
      return (
        <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-emerald-600 via-teal-700 to-emerald-500 p-0.5 shadow-md flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
          <div className="w-full h-full rounded-[14px] bg-gradient-to-b from-emerald-600 to-teal-800 flex items-center justify-center text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-white/15 opacity-0 group-hover:opacity-100 transition-opacity" />
            <Landmark className="w-6.5 h-6.5 drop-shadow-sm stroke-white stroke-[2.2]" />
          </div>
        </div>
      );

    case 'police':
      return (
        <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-blue-400 p-0.5 shadow-md flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
          <div className="w-full h-full rounded-[14px] bg-gradient-to-b from-blue-500 to-indigo-700 flex items-center justify-center text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-white/15 opacity-0 group-hover:opacity-100 transition-opacity" />
            <Shield className="w-6.5 h-6.5 drop-shadow-sm fill-white/20 stroke-white stroke-[2.2]" />
          </div>
        </div>
      );

    case 'fire-service':
      return (
        <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-red-600 via-rose-600 to-orange-500 p-0.5 shadow-md flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
          <div className="w-full h-full rounded-[14px] bg-gradient-to-b from-red-500 to-rose-700 flex items-center justify-center text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-white/15 opacity-0 group-hover:opacity-100 transition-opacity" />
            <Flame className="w-6.5 h-6.5 drop-shadow-sm fill-white/30 stroke-white stroke-[2.2]" />
          </div>
        </div>
      );

    case 'electricity':
      return (
        <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-amber-500 via-yellow-500 to-orange-400 p-0.5 shadow-md flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
          <div className="w-full h-full rounded-[14px] bg-gradient-to-b from-amber-500 to-yellow-600 flex items-center justify-center text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-white/15 opacity-0 group-hover:opacity-100 transition-opacity" />
            <Zap className="w-6.5 h-6.5 drop-shadow-sm fill-white stroke-white stroke-[2]" />
          </div>
        </div>
      );

    case 'lawyer':
      return (
        <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-amber-700 via-yellow-600 to-amber-500 p-0.5 shadow-md flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
          <div className="w-full h-full rounded-[14px] bg-gradient-to-b from-amber-600 to-yellow-700 flex items-center justify-center text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-white/15 opacity-0 group-hover:opacity-100 transition-opacity" />
            <Scale className="w-6.5 h-6.5 drop-shadow-sm stroke-white stroke-[2.2]" />
          </div>
        </div>
      );

    case 'journalist':
      return (
        <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-indigo-400 p-0.5 shadow-md flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
          <div className="w-full h-full rounded-[14px] bg-gradient-to-b from-indigo-500 to-purple-700 flex items-center justify-center text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-white/15 opacity-0 group-hover:opacity-100 transition-opacity" />
            <Camera className="w-6.5 h-6.5 drop-shadow-sm stroke-white stroke-[2.2]" />
          </div>
        </div>
      );

    // 2. স্বাস্থ্য সেবা
    case 'doctor':
      return (
        <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-teal-600 via-emerald-600 to-teal-400 p-0.5 shadow-md flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
          <div className="w-full h-full rounded-[14px] bg-gradient-to-b from-teal-500 to-emerald-700 flex items-center justify-center text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-white/15 opacity-0 group-hover:opacity-100 transition-opacity" />
            <Stethoscope className="w-6.5 h-6.5 drop-shadow-sm stroke-white stroke-[2.2]" />
          </div>
        </div>
      );

    case 'veterinary':
      return (
        <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-emerald-600 via-green-600 to-emerald-400 p-0.5 shadow-md flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
          <div className="w-full h-full rounded-[14px] bg-gradient-to-b from-emerald-500 to-green-700 flex items-center justify-center text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-white/15 opacity-0 group-hover:opacity-100 transition-opacity" />
            <HeartPulse className="w-6.5 h-6.5 drop-shadow-sm stroke-white stroke-[2.2]" />
          </div>
        </div>
      );

    case 'hospital':
      return (
        <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-cyan-600 via-sky-600 to-blue-500 p-0.5 shadow-md flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
          <div className="w-full h-full rounded-[14px] bg-gradient-to-b from-cyan-500 to-blue-700 flex items-center justify-center text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-white/15 opacity-0 group-hover:opacity-100 transition-opacity" />
            <Building2 className="w-6.5 h-6.5 drop-shadow-sm stroke-white stroke-[2.2]" />
          </div>
        </div>
      );

    case 'pathology':
      return (
        <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-violet-600 via-purple-600 to-indigo-500 p-0.5 shadow-md flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
          <div className="w-full h-full rounded-[14px] bg-gradient-to-b from-violet-500 to-indigo-700 flex items-center justify-center text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-white/15 opacity-0 group-hover:opacity-100 transition-opacity" />
            <FlaskConical className="w-6.5 h-6.5 drop-shadow-sm stroke-white stroke-[2.2]" />
          </div>
        </div>
      );

    case 'pharmacy':
      return (
        <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-teal-500 via-cyan-600 to-blue-500 p-0.5 shadow-md flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
          <div className="w-full h-full rounded-[14px] bg-gradient-to-b from-teal-500 to-cyan-700 flex items-center justify-center text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-white/15 opacity-0 group-hover:opacity-100 transition-opacity" />
            <Pill className="w-6.5 h-6.5 drop-shadow-sm stroke-white stroke-[2.2]" />
          </div>
        </div>
      );

    case 'ambulance':
      return (
        <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-rose-600 via-red-600 to-pink-500 p-0.5 shadow-md flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
          <div className="w-full h-full rounded-[14px] bg-gradient-to-b from-rose-500 to-red-700 flex items-center justify-center text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-white/15 opacity-0 group-hover:opacity-100 transition-opacity" />
            <Ambulance className="w-6.5 h-6.5 drop-shadow-sm stroke-white stroke-[2.2]" />
          </div>
        </div>
      );

    case 'blood':
    case 'blood-donor':
      return (
        <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-red-600 via-rose-700 to-red-500 p-0.5 shadow-md flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
          <div className="w-full h-full rounded-[14px] bg-gradient-to-b from-red-600 to-rose-800 flex items-center justify-center text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-white/15 opacity-0 group-hover:opacity-100 transition-opacity" />
            <Droplet className="w-6.5 h-6.5 drop-shadow-sm fill-white stroke-white stroke-[2]" />
          </div>
        </div>
      );

    // 3. শিক্ষা সেবা
    case 'tutor':
    case 'private-tutor':
      return (
        <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-indigo-600 via-blue-600 to-sky-500 p-0.5 shadow-md flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
          <div className="w-full h-full rounded-[14px] bg-gradient-to-b from-indigo-500 to-blue-700 flex items-center justify-center text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-white/15 opacity-0 group-hover:opacity-100 transition-opacity" />
            <GraduationCap className="w-6.5 h-6.5 drop-shadow-sm stroke-white stroke-[2.2]" />
          </div>
        </div>
      );

    case 'arabic':
    case 'arabic-teacher':
      return (
        <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-emerald-600 via-teal-600 to-green-500 p-0.5 shadow-md flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
          <div className="w-full h-full rounded-[14px] bg-gradient-to-b from-emerald-500 to-teal-700 flex items-center justify-center text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-white/15 opacity-0 group-hover:opacity-100 transition-opacity" />
            <BookOpen className="w-6.5 h-6.5 drop-shadow-sm stroke-white stroke-[2.2]" />
          </div>
        </div>
      );

    case 'coaching':
      return (
        <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-amber-600 via-orange-600 to-yellow-500 p-0.5 shadow-md flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
          <div className="w-full h-full rounded-[14px] bg-gradient-to-b from-amber-500 to-orange-700 flex items-center justify-center text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-white/15 opacity-0 group-hover:opacity-100 transition-opacity" />
            <School className="w-6.5 h-6.5 drop-shadow-sm stroke-white stroke-[2.2]" />
          </div>
        </div>
      );

    // 4. আইটি সেবা
    case 'computer-training':
      return (
        <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-blue-600 via-cyan-600 to-teal-500 p-0.5 shadow-md flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
          <div className="w-full h-full rounded-[14px] bg-gradient-to-b from-blue-500 to-cyan-700 flex items-center justify-center text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-white/15 opacity-0 group-hover:opacity-100 transition-opacity" />
            <Monitor className="w-6.5 h-6.5 drop-shadow-sm stroke-white stroke-[2.2]" />
          </div>
        </div>
      );

    case 'computer-repair':
      return (
        <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-slate-700 via-gray-700 to-zinc-500 p-0.5 shadow-md flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
          <div className="w-full h-full rounded-[14px] bg-gradient-to-b from-slate-600 to-zinc-800 flex items-center justify-center text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-white/15 opacity-0 group-hover:opacity-100 transition-opacity" />
            <Wrench className="w-6.5 h-6.5 drop-shadow-sm stroke-white stroke-[2.2]" />
          </div>
        </div>
      );

    case 'printing-design':
      return (
        <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-fuchsia-600 via-pink-600 to-rose-500 p-0.5 shadow-md flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
          <div className="w-full h-full rounded-[14px] bg-gradient-to-b from-fuchsia-500 to-pink-700 flex items-center justify-center text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-white/15 opacity-0 group-hover:opacity-100 transition-opacity" />
            <Printer className="w-6.5 h-6.5 drop-shadow-sm stroke-white stroke-[2.2]" />
          </div>
        </div>
      );

    case 'software-web':
      return (
        <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-violet-600 via-purple-600 to-indigo-500 p-0.5 shadow-md flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
          <div className="w-full h-full rounded-[14px] bg-gradient-to-b from-violet-500 to-purple-700 flex items-center justify-center text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-white/15 opacity-0 group-hover:opacity-100 transition-opacity" />
            <Code className="w-6.5 h-6.5 drop-shadow-sm stroke-white stroke-[2.2]" />
          </div>
        </div>
      );

    case 'online-services':
      return (
        <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-sky-600 via-blue-600 to-indigo-500 p-0.5 shadow-md flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
          <div className="w-full h-full rounded-[14px] bg-gradient-to-b from-sky-500 to-blue-700 flex items-center justify-center text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-white/15 opacity-0 group-hover:opacity-100 transition-opacity" />
            <Globe className="w-6.5 h-6.5 drop-shadow-sm stroke-white stroke-[2.2]" />
          </div>
        </div>
      );

    // 5. পরিবহন সেবা
    case 'courier':
      return (
        <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-orange-500 via-amber-600 to-orange-400 p-0.5 shadow-md flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
          <div className="w-full h-full rounded-[14px] bg-gradient-to-b from-orange-500 to-amber-700 flex items-center justify-center text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-white/15 opacity-0 group-hover:opacity-100 transition-opacity" />
            <Package className="w-6.5 h-6.5 drop-shadow-sm stroke-white stroke-[2.2]" />
          </div>
        </div>
      );

    case 'car':
    case 'car-rental':
      return (
        <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-sky-600 via-blue-600 to-cyan-500 p-0.5 shadow-md flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
          <div className="w-full h-full rounded-[14px] bg-gradient-to-b from-sky-500 to-blue-700 flex items-center justify-center text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-white/15 opacity-0 group-hover:opacity-100 transition-opacity" />
            <Car className="w-6.5 h-6.5 drop-shadow-sm stroke-white stroke-[2.2]" />
          </div>
        </div>
      );

    case 'truck':
    case 'truck-rental':
      return (
        <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-stone-600 via-amber-700 to-stone-500 p-0.5 shadow-md flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
          <div className="w-full h-full rounded-[14px] bg-gradient-to-b from-stone-600 to-amber-800 flex items-center justify-center text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-white/15 opacity-0 group-hover:opacity-100 transition-opacity" />
            <Truck className="w-6.5 h-6.5 drop-shadow-sm stroke-white stroke-[2.2]" />
          </div>
        </div>
      );

    case 'bike':
    case 'bike-rental':
      return (
        <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-slate-700 via-gray-700 to-slate-500 p-0.5 shadow-md flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
          <div className="w-full h-full rounded-[14px] bg-gradient-to-b from-slate-600 to-gray-800 flex items-center justify-center text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-white/15 opacity-0 group-hover:opacity-100 transition-opacity" />
            <Bike className="w-6.5 h-6.5 drop-shadow-sm stroke-white stroke-[2.2]" />
          </div>
        </div>
      );

    case 'travel':
    case 'travel-agency':
      return (
        <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-emerald-600 via-teal-600 to-cyan-500 p-0.5 shadow-md flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
          <div className="w-full h-full rounded-[14px] bg-gradient-to-b from-emerald-500 to-teal-700 flex items-center justify-center text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-white/15 opacity-0 group-hover:opacity-100 transition-opacity" />
            <Plane className="w-6.5 h-6.5 drop-shadow-sm stroke-white stroke-[2.2]" />
          </div>
        </div>
      );

    // 6. ইভেন্ট ম্যানেজমেন্ট সেবা
    case 'decorators':
      return (
        <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-amber-500 via-rose-500 to-yellow-400 p-0.5 shadow-md flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
          <div className="w-full h-full rounded-[14px] bg-gradient-to-b from-amber-500 to-rose-600 flex items-center justify-center text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-white/15 opacity-0 group-hover:opacity-100 transition-opacity" />
            <Sparkles className="w-6.5 h-6.5 drop-shadow-sm stroke-white stroke-[2.2]" />
          </div>
        </div>
      );

    case 'event':
    case 'event-management':
      return (
        <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-purple-600 via-pink-600 to-rose-400 p-0.5 shadow-md flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
          <div className="w-full h-full rounded-[14px] bg-gradient-to-b from-purple-500 to-pink-700 flex items-center justify-center text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-white/15 opacity-0 group-hover:opacity-100 transition-opacity" />
            <PartyPopper className="w-6.5 h-6.5 drop-shadow-sm stroke-white stroke-[2.2]" />
          </div>
        </div>
      );

    case 'photography':
      return (
        <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-cyan-600 via-blue-600 to-indigo-500 p-0.5 shadow-md flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
          <div className="w-full h-full rounded-[14px] bg-gradient-to-b from-cyan-500 to-blue-700 flex items-center justify-center text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-white/15 opacity-0 group-hover:opacity-100 transition-opacity" />
            <Camera className="w-6.5 h-6.5 drop-shadow-sm stroke-white stroke-[2.2]" />
          </div>
        </div>
      );

    case 'cook':
    case 'cook-chef':
      return (
        <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-red-600 via-orange-600 to-amber-500 p-0.5 shadow-md flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
          <div className="w-full h-full rounded-[14px] bg-gradient-to-b from-red-500 to-orange-700 flex items-center justify-center text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-white/15 opacity-0 group-hover:opacity-100 transition-opacity" />
            <ChefHat className="w-6.5 h-6.5 drop-shadow-sm stroke-white stroke-[2.2]" />
          </div>
        </div>
      );

    case 'community':
    case 'community-center':
      return (
        <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-blue-700 via-indigo-700 to-violet-600 p-0.5 shadow-md flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
          <div className="w-full h-full rounded-[14px] bg-gradient-to-b from-blue-600 to-indigo-800 flex items-center justify-center text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-white/15 opacity-0 group-hover:opacity-100 transition-opacity" />
            <Building2 className="w-6.5 h-6.5 drop-shadow-sm stroke-white stroke-[2.2]" />
          </div>
        </div>
      );

    // 7. হোমমেড
    case 'cake':
    case 'homemade-cake':
      return (
        <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-pink-500 via-rose-500 to-amber-400 p-0.5 shadow-md flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
          <div className="w-full h-full rounded-[14px] bg-gradient-to-b from-pink-500 to-rose-600 flex items-center justify-center text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-white/15 opacity-0 group-hover:opacity-100 transition-opacity" />
            <Cake className="w-6.5 h-6.5 drop-shadow-sm stroke-white stroke-[2.2]" />
          </div>
        </div>
      );

    case 'homemade-food':
    case 'homemade-foods':
      return (
        <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-amber-600 via-orange-600 to-red-500 p-0.5 shadow-md flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
          <div className="w-full h-full rounded-[14px] bg-gradient-to-b from-amber-500 to-orange-700 flex items-center justify-center text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-white/15 opacity-0 group-hover:opacity-100 transition-opacity" />
            <UtensilsCrossed className="w-6.5 h-6.5 drop-shadow-sm stroke-white stroke-[2.2]" />
          </div>
        </div>
      );

    // অন্যান্য ও সহায়ক
    case 'famous':
      return (
        <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-purple-600 via-fuchsia-600 to-pink-500 p-0.5 shadow-md flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
          <div className="w-full h-full rounded-[14px] bg-gradient-to-b from-purple-500 to-fuchsia-700 flex items-center justify-center text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-white/15 opacity-0 group-hover:opacity-100 transition-opacity" />
            <Award className="w-6.5 h-6.5 drop-shadow-sm stroke-white stroke-[2.2]" />
          </div>
        </div>
      );

    case 'cng':
      return (
        <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-green-600 via-emerald-600 to-lime-500 p-0.5 shadow-md flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
          <div className="w-full h-full rounded-[14px] bg-gradient-to-b from-green-500 to-emerald-700 flex items-center justify-center text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-white/15 opacity-0 group-hover:opacity-100 transition-opacity" />
            <Navigation className="w-6.5 h-6.5 drop-shadow-sm stroke-white stroke-[2.2]" />
          </div>
        </div>
      );

    case 'bus':
      return (
        <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-indigo-600 via-blue-700 to-indigo-500 p-0.5 shadow-md flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
          <div className="w-full h-full rounded-[14px] bg-gradient-to-b from-indigo-600 to-blue-800 flex items-center justify-center text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-white/15 opacity-0 group-hover:opacity-100 transition-opacity" />
            <Bus className="w-6.5 h-6.5 drop-shadow-sm stroke-white stroke-[2.2]" />
          </div>
        </div>
      );

    case 'train':
      return (
        <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-amber-600 via-orange-600 to-yellow-500 p-0.5 shadow-md flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
          <div className="w-full h-full rounded-[14px] bg-gradient-to-b from-amber-600 to-orange-700 flex items-center justify-center text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-white/15 opacity-0 group-hover:opacity-100 transition-opacity" />
            <Train className="w-6.5 h-6.5 drop-shadow-sm stroke-white stroke-[2.2]" />
          </div>
        </div>
      );

    case 'land':
      return (
        <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-teal-600 via-cyan-700 to-teal-500 p-0.5 shadow-md flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
          <div className="w-full h-full rounded-[14px] bg-gradient-to-b from-teal-600 to-cyan-800 flex items-center justify-center text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-white/15 opacity-0 group-hover:opacity-100 transition-opacity" />
            <FileText className="w-6.5 h-6.5 drop-shadow-sm stroke-white stroke-[2.2]" />
          </div>
        </div>
      );

    case 'chairmen':
      return (
        <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-blue-700 via-indigo-700 to-blue-500 p-0.5 shadow-md flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
          <div className="w-full h-full rounded-[14px] bg-gradient-to-b from-blue-600 to-indigo-800 flex items-center justify-center text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-white/15 opacity-0 group-hover:opacity-100 transition-opacity" />
            <Users className="w-6.5 h-6.5 drop-shadow-sm stroke-white stroke-[2.2]" />
          </div>
        </div>
      );

    case 'bank':
      return (
        <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-teal-600 via-emerald-600 to-cyan-500 p-0.5 shadow-md flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
          <div className="w-full h-full rounded-[14px] bg-gradient-to-b from-teal-500 to-emerald-700 flex items-center justify-center text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-white/15 opacity-0 group-hover:opacity-100 transition-opacity" />
            <CreditCard className="w-6.5 h-6.5 drop-shadow-sm stroke-white stroke-[2.2]" />
          </div>
        </div>
      );

    case 'post':
      return (
        <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-red-600 via-rose-600 to-amber-500 p-0.5 shadow-md flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
          <div className="w-full h-full rounded-[14px] bg-gradient-to-b from-red-500 to-rose-700 flex items-center justify-center text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-white/15 opacity-0 group-hover:opacity-100 transition-opacity" />
            <Mail className="w-6.5 h-6.5 drop-shadow-sm stroke-white stroke-[2.2]" />
          </div>
        </div>
      );

    case 'social':
      return (
        <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-rose-700 via-pink-700 to-rose-500 p-0.5 shadow-md flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
          <div className="w-full h-full rounded-[14px] bg-gradient-to-b from-rose-600 to-pink-800 flex items-center justify-center text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-white/15 opacity-0 group-hover:opacity-100 transition-opacity" />
            <HeartHandshake className="w-6.5 h-6.5 drop-shadow-sm stroke-white stroke-[2.2]" />
          </div>
        </div>
      );

    default:
      return (
        <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 p-0.5 shadow-md flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
          <div className="w-full h-full rounded-[14px] bg-blue-600 flex items-center justify-center text-white">
            <Shield className="w-6.5 h-6.5 stroke-white" />
          </div>
        </div>
      );
  }
};

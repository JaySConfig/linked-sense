"use client";

import ProfileWizard from '@/components/ProfileWizard';

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl md:text-4xl font-extrabold">My Profile</h1>
      <ProfileWizard />
    </div>
  );
}
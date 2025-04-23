import { redirect } from 'next/navigation';

export default function DashboardPage() {
    redirect('/admin/dashboard/teams');
    return null;
}
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Edit, Mail, Shield, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import Button from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { useFetch } from '@/hooks/useFetch';
import InviteJuryPopup from './popup/InviteJuryPopup';

interface UserPayload {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  role: 'admin' | 'jury';
}

export default function UsersPage() {
  const { t } = useTranslation();
  const { data: users, isLoading, error, refetch } = useFetch<UserPayload[]>('/users');
  const [isInviteOpen, setIsInviteOpen] = useState(false);

  if (isLoading)
    return <div className="text-muted-foreground p-8 text-center text-sm">{t('admin.dashboard.loading')}</div>;
  if (error) return <div className="text-destructive p-8 text-center text-sm">{error}</div>;

  const handleDeleteUser = async (userId: number) => {
    if (!window.confirm(t('admin.users.confirm_delete'))) return;

    try {
      await toast.promise(
        fetch(`${import.meta.env.VITE_API_URL}/users/${userId}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }).then(response => {
          if (!response.ok) {
            throw new Error();
          }

          return response;
        }),
        {
          loading: t('toast.common.loading'),
          success: t('toast.user.deleted'),
          error: t('toast.common.error'),
        }
      );

      refetch();
    } catch (error) {
      console.error(error);
    }
  };
  const allUsers = users ?? [];

  return (
    <div className="px-4 py-6 md:p-8">
      <div className="mb-6 flex items-center justify-between gap-4">
        <h1 className="text-foreground mb-6 text-xl font-bold md:mb-8 md:text-2xl">{t('admin.users.title')}</h1>
        <Button variant="purple" onClick={() => setIsInviteOpen(true)}>
          {t('button.invite_jury')}
        </Button>
      </div>

      {allUsers.length === 0 ? (
        <Card className="text-muted-foreground p-8 text-center text-sm">{t('admin.users.empty')}</Card>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {allUsers.map(user => (
            <Card key={user.id} className="border-border flex flex-col justify-between border p-4 shadow-sm">
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <h3 className="text-foreground text-base font-semibold">
                    {user.firstname} {user.lastname}
                  </h3>
                  <div className="text-muted-foreground bg-muted flex items-center gap-1.5 rounded-sm px-2 py-0.5 text-xs font-medium">
                    <Shield size={12} className="text-primary" />
                    <span>{t(`admin.users.role_${user.role}`)}</span>
                  </div>
                </div>

                <div className="text-primary flex items-center gap-2 text-sm break-all">
                  <Mail size={14} className="shrink-0" />
                  <a href={`mailto:${user.email}`} className="hover:underline">
                    {user.email}
                  </a>
                </div>
              </div>

              <div className="border-border mt-4 flex gap-2 border-t pt-3">
                <Button
                  icon={<Edit size={14} />}
                  className="bg-muted text-foreground hover:bg-muted/80 flex-1 justify-center rounded-xl py-2 text-xs"
                >
                  {t('admin.users.actions.edit')}
                </Button>
                <Button
                  onClick={() => handleDeleteUser(user.id)}
                  icon={<Trash2 size={14} />}
                  className="flex-1 justify-center rounded-xl bg-red-50 py-2 text-xs text-red-600 hover:bg-red-100"
                >
                  {t('admin.users.actions.delete')}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
      <InviteJuryPopup open={isInviteOpen} onClose={() => setIsInviteOpen(false)} />
    </div>
  );
}

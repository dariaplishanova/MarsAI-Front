import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from '@/components/ui/Button';
import Form, { ErrorParagraph, FormGroup, Input, Label } from '@/components/ui/Form';
import Popup from '@/components/ui/Popup';
import { useAuth } from '@/hooks/useAuth';

interface InviteJuryPopupProps {
  open: boolean;
  onClose: () => void;
}

interface InviteJuryFormData {
  email: string;
}

export default function InviteJuryPopup({ open, onClose }: InviteJuryPopupProps) {
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<InviteJuryFormData>({
    mode: 'onTouched',
    defaultValues: {
      email: '',
    },
  });

  const onInvite = async (data: InviteJuryFormData) => {
    const API_URL = import.meta.env.VITE_API_URL;

    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/auth/invite`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        alert(result.message || 'Invite failed');
        return;
      }

      alert('Invitation sent');
      reset();
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Popup className="bg-white" open={open} onClose={onClose}>
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold">Invite Jury</h2>
          <p className="text-muted-foreground text-sm">Send an invitation email to a new jury member.</p>
        </div>

        <Form className="border-none" onSubmit={handleSubmit(onInvite)}>
          <FormGroup>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="jury@gmail.com"
              {...register('email', { required: 'Email is required' })}
            />
            {errors.email && <ErrorParagraph>{errors.email.message}</ErrorParagraph>}
          </FormGroup>

          <div className="flex justify-end gap-3 pt-2">
            <Button variant="ghost" type="button" onClick={onClose}>
              Cancel
            </Button>

            <Button variant="purple" type="submit" disabled={loading}>
              {loading ? 'Sending...' : 'Send Invite'}
            </Button>
          </div>
        </Form>
      </div>
    </Popup>
  );
}

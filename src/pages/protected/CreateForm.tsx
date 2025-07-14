import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, Trash2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

interface FormField {
  id: string;
  label: string;
  placeholder: string;
  mandatory: boolean;
}

const CreateForm = () => {
  const [fields, setFields] = useState<FormField[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newField, setNewField] = useState({
    label: '',
    placeholder: '',
    mandatory: false
  });
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleAddField = () => {
    if (newField.label && newField.placeholder) {
      const field: FormField = {
        id: Date.now().toString(),
        label: newField.label,
        placeholder: newField.placeholder,
        mandatory: newField.mandatory
      };
      setFields([...fields, field]);
      setNewField({ label: '', placeholder: '', mandatory: false });
      setIsModalOpen(false);
    }
  };

  const handleDeleteAllFields = () => {
    setFields([]);
  };

  const handleSave = () => {
    toast({
      title: "Success!",
      description: "Form has been saved successfully.",
    });
    navigate('/dashboard/members');
  };

  const handleDeleteField = (id: string) => {
    setFields(fields.filter(field => field.id !== id));
  };

  return (
    <div className="p-6">
      <div className="border border-[#E2E8F0] rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-foreground">Form Builder</h2>
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center space-x-2">
                <Plus className="w-4 h-4" />
                <span>Add field</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add field!</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="label">Label name</Label>
                  <Input
                    id="label"
                    placeholder="Create label name"
                    value={newField.label}
                    onChange={(e) => setNewField({ ...newField, label: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="placeholder">Placeholder name</Label>
                  <Input
                    id="placeholder"
                    placeholder="Create placeholder name"
                    value={newField.placeholder}
                    onChange={(e) => setNewField({ ...newField, placeholder: e.target.value })}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="mandatory"
                    checked={newField.mandatory}
                    onCheckedChange={(checked) => setNewField({ ...newField, mandatory: checked as boolean })}
                  />
                  <Label htmlFor="mandatory">Make this field mandatory</Label>
                </div>
                <div className="flex space-x-2 pt-4">
                  <Button variant="outline" onClick={() => setIsModalOpen(false)} className="flex-1">
                    Cancel
                  </Button>
                  <Button onClick={handleAddField} className="flex-1 bg-primary text-primary-foreground">
                    Add
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {fields.length === 0 ? (
          <div className="h-[150px] bg-[#F8F8F8] border-2 border-[#D1D5DB] border-dashed rounded-lg flex flex-col items-center justify-center mb-6">
            <div className="w-12 h-12 border-2 border-gray-400 rounded-lg flex items-center justify-center mb-4">
              <Plus className="w-6 h-6 text-gray-400" />
            </div>
            <p className="text-lg font-medium text-gray-900 mb-1">No fields added yet.</p>
            <p className="text-sm text-gray-500">Click "Add New Field" to start building your form.</p>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-4 mb-6">
            {fields.map((field) => (
              <div key={field.id} className="p-4 border border-border rounded-lg">
                <div className="space-y-1 relative">
                  <Label className="text-sm font-medium">{field.label}{field.mandatory && '*'}</Label>
                  <Input placeholder={field.placeholder} disabled />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-6 right-2 h-8 w-8 text-destructive hover:text-destructive"
                    onClick={() => handleDeleteField(field.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-between">
          {fields.length > 0 ? (
            <div className="flex gap-4">
              <Button 
                variant="outline" 
                onClick={handleDeleteAllFields}
                className="text-destructive hover:text-destructive"
              >
                Delete all fields
              </Button>
              <Button onClick={handleSave} className="bg-primary text-primary-foreground">
                Save Form
              </Button>
            </div>
          ) : (
            <div className="w-full flex justify-end">
              <Button onClick={handleSave} className="bg-primary text-primary-foreground">
                Save Form
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateForm;
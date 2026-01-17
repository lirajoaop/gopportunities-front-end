'use client';

import { useState } from 'react';
import Input from './Input';
import Toggle from './Toggle';
import Button from './Button';

export default function OpeningForm({ initialData = null, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    role: initialData?.role || '',
    company: initialData?.company || '',
    location: initialData?.location || '',
    remote: initialData?.remote || false,
    link: initialData?.link || '',
    salary: initialData?.salary || '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.role.trim()) {
      newErrors.role = 'Role is required';
    }

    if (!formData.company.trim()) {
      newErrors.company = 'Company is required';
    }

    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }

    if (!formData.link.trim()) {
      newErrors.link = 'Link is required';
    } else if (!/^https?:\/\/.+/.test(formData.link)) {
      newErrors.link = 'Link must be a valid URL (starting with http:// or https://)';
    }

    if (!formData.salary || formData.salary <= 0) {
      newErrors.salary = 'Salary must be greater than 0';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const submitData = {
        ...formData,
        salary: parseInt(formData.salary, 10),
      };

      await onSubmit(submitData);
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Job Role"
        name="role"
        value={formData.role}
        onChange={handleChange}
        error={errors.role}
        required
        placeholder="e.g., Senior Frontend Developer"
      />

      <Input
        label="Company"
        name="company"
        value={formData.company}
        onChange={handleChange}
        error={errors.company}
        required
        placeholder="e.g., Tech Corp"
      />

      <Input
        label="Location"
        name="location"
        value={formData.location}
        onChange={handleChange}
        error={errors.location}
        required
        placeholder="e.g., San Francisco, CA or Remote"
      />

      <Toggle
        label="Remote Position"
        name="remote"
        checked={formData.remote}
        onChange={handleChange}
      />

      <Input
        label="Application Link"
        name="link"
        type="url"
        value={formData.link}
        onChange={handleChange}
        error={errors.link}
        required
        placeholder="https://example.com/apply"
      />

      <Input
        label="Annual Salary (USD)"
        name="salary"
        type="number"
        value={formData.salary}
        onChange={handleChange}
        error={errors.salary}
        required
        placeholder="e.g., 120000"
        min="0"
      />

      <div className="flex gap-3 pt-4">
        <Button
          type="submit"
          variant="primary"
          disabled={isSubmitting}
          className="flex-1"
        >
          {isSubmitting ? 'Saving...' : initialData ? 'Update Opening' : 'Create Opening'}
        </Button>
        <Button
          type="button"
          variant="ghost"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}

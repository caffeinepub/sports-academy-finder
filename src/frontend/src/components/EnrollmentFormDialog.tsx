import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2, Loader2 } from "lucide-react";
import { useState } from "react";

interface EnrollmentFormProps {
  academyName: string;
  sport: string;
  trigger: React.ReactNode;
}

interface FormData {
  fullName: string;
  age: string;
  phone: string;
  address: string;
}

interface FormErrors {
  fullName?: string;
  age?: string;
  phone?: string;
  address?: string;
}

const EMPTY_FORM: FormData = {
  fullName: "",
  age: "",
  phone: "",
  address: "",
};

export function EnrollmentFormDialog({
  academyName,
  sport,
  trigger,
}: EnrollmentFormProps) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<FormData>(EMPTY_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function validate(): FormErrors {
    const errs: FormErrors = {};
    if (!form.fullName.trim()) errs.fullName = "Full name is required.";
    if (!form.age.trim()) {
      errs.age = "Age is required.";
    } else {
      const ageNum = Number(form.age);
      if (Number.isNaN(ageNum) || ageNum < 5 || ageNum > 100) {
        errs.age = "Age must be between 5 and 100.";
      }
    }
    if (!form.phone.trim()) {
      errs.phone = "Phone number is required.";
    } else if (!/^[+]?[0-9\s\-]{7,15}$/.test(form.phone.trim())) {
      errs.phone = "Enter a valid phone number.";
    }
    if (!form.address.trim()) errs.address = "Address is required.";
    return errs;
  }

  function handleChange(field: keyof FormData, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setSubmitting(true);
    // Simulate async submit
    await new Promise((resolve) => setTimeout(resolve, 800));
    setSubmitting(false);
    setSubmitted(true);
  }

  function handleOpenChange(val: boolean) {
    setOpen(val);
    if (!val) {
      // Reset on close
      setTimeout(() => {
        setForm(EMPTY_FORM);
        setErrors({});
        setSubmitted(false);
        setSubmitting(false);
      }, 200);
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild data-ocid="enrollment.open_modal_button">
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md" data-ocid="enrollment.dialog">
        {submitted ? (
          <div
            className="flex flex-col items-center gap-4 py-8 text-center"
            data-ocid="enrollment.success_state"
          >
            <CheckCircle2 className="h-14 w-14 text-green-500" />
            <DialogTitle className="text-xl font-bold">
              Enrollment Submitted!
            </DialogTitle>
            <p className="text-muted-foreground">
              Thank you for your interest in{" "}
              <span className="font-semibold text-foreground">
                {academyName}
              </span>
              .
              <br />
              We&apos;ll contact you soon.
            </p>
            <Button
              className="mt-2 w-full"
              onClick={() => handleOpenChange(false)}
              data-ocid="enrollment.close_button"
            >
              Close
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate>
            <DialogHeader className="mb-4">
              <DialogTitle className="text-xl">
                Enroll at {academyName}
              </DialogTitle>
              <DialogDescription>
                {sport} Academy — Fill in your details below to enroll.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              {/* Full Name */}
              <div className="space-y-1">
                <Label htmlFor="enroll-name">Full Name *</Label>
                <Input
                  id="enroll-name"
                  type="text"
                  placeholder="e.g. Arjun Kumar"
                  value={form.fullName}
                  onChange={(e) => handleChange("fullName", e.target.value)}
                  aria-invalid={!!errors.fullName}
                  data-ocid="enrollment.input"
                />
                {errors.fullName && (
                  <p
                    className="text-destructive text-xs mt-1"
                    data-ocid="enrollment.error_state"
                  >
                    {errors.fullName}
                  </p>
                )}
              </div>

              {/* Age */}
              <div className="space-y-1">
                <Label htmlFor="enroll-age">Age *</Label>
                <Input
                  id="enroll-age"
                  type="number"
                  placeholder="e.g. 14"
                  min={5}
                  max={100}
                  value={form.age}
                  onChange={(e) => handleChange("age", e.target.value)}
                  aria-invalid={!!errors.age}
                  data-ocid="enrollment.input"
                />
                {errors.age && (
                  <p
                    className="text-destructive text-xs mt-1"
                    data-ocid="enrollment.error_state"
                  >
                    {errors.age}
                  </p>
                )}
              </div>

              {/* Phone Number */}
              <div className="space-y-1">
                <Label htmlFor="enroll-phone">Phone Number *</Label>
                <Input
                  id="enroll-phone"
                  type="tel"
                  placeholder="e.g. +91 98400 12345"
                  value={form.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  aria-invalid={!!errors.phone}
                  data-ocid="enrollment.input"
                />
                {errors.phone && (
                  <p
                    className="text-destructive text-xs mt-1"
                    data-ocid="enrollment.error_state"
                  >
                    {errors.phone}
                  </p>
                )}
              </div>

              {/* Address */}
              <div className="space-y-1">
                <Label htmlFor="enroll-address">Address *</Label>
                <Textarea
                  id="enroll-address"
                  placeholder="Your full address in Chennai"
                  rows={3}
                  value={form.address}
                  onChange={(e) => handleChange("address", e.target.value)}
                  aria-invalid={!!errors.address}
                  data-ocid="enrollment.textarea"
                />
                {errors.address && (
                  <p
                    className="text-destructive text-xs mt-1"
                    data-ocid="enrollment.error_state"
                  >
                    {errors.address}
                  </p>
                )}
              </div>
            </div>

            <DialogFooter className="mt-6 flex gap-2">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() => handleOpenChange(false)}
                data-ocid="enrollment.cancel_button"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1"
                disabled={submitting}
                data-ocid="enrollment.submit_button"
              >
                {submitting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Enrollment"
                )}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}

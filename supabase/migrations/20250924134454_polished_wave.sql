```sql
-- Enable Row Level Security for stripe_customers table
ALTER TABLE public.stripe_customers ENABLE ROW LEVEL SECURITY;

-- Create a policy to allow authenticated users to select their own stripe_customers data
CREATE POLICY "Allow authenticated users to read their own stripe_customers"
ON public.stripe_customers
FOR SELECT
TO authenticated
USING (user_id = auth.uid());

-- Enable Row Level Security for stripe_subscriptions table
ALTER TABLE public.stripe_subscriptions ENABLE ROW LEVEL SECURITY;

-- Create a policy to allow authenticated users to read their own stripe_subscriptions data
CREATE POLICY "Allow authenticated users to read their own stripe_subscriptions"
ON public.stripe_subscriptions
FOR SELECT
TO authenticated
USING (EXISTS (SELECT 1 FROM public.stripe_customers WHERE customer_id = stripe_subscriptions.customer_id AND user_id = auth.uid()));
```
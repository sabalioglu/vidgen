/*
  # Fix stripe_subscriptions table

  1. Changes
    - Make subscription_id nullable since users may not have subscriptions initially
    - Allow for "not_started" status records without subscription_id
  2. Security
    - Maintain existing RLS policies
*/

-- Update stripe_subscriptions table to allow nullable subscription_id
ALTER TABLE public.stripe_subscriptions 
ALTER COLUMN subscription_id DROP NOT NULL;

-- Update stripe_subscriptions table to allow nullable price_id initially
ALTER TABLE public.stripe_subscriptions 
ALTER COLUMN price_id DROP NOT NULL;

-- Update stripe_subscriptions table to allow nullable period dates initially
ALTER TABLE public.stripe_subscriptions 
ALTER COLUMN current_period_start DROP NOT NULL;

ALTER TABLE public.stripe_subscriptions 
ALTER COLUMN current_period_end DROP NOT NULL;

-- Update stripe_subscriptions table to allow nullable cancel_at_period_end initially
ALTER TABLE public.stripe_subscriptions 
ALTER COLUMN cancel_at_period_end DROP NOT NULL;
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://qjtmeczhgovwrjbgdsav.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFqdG1lY3poZ292d3JqYmdkc2F2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA4NzUwNjAsImV4cCI6MjA4NjQ1MTA2MH0.aMa4Kb61GzIutmlZr6Moc0tceG_vMtCkAIy1dmWeWuA";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
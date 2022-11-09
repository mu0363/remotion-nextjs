import { useUser, useSupabaseClient, Session } from "@supabase/auth-helpers-react";
import { useState, useEffect, useCallback } from "react";
import { Database } from "src/types/database.types";
type Profiles = Database["public"]["Tables"]["profiles"]["Row"];

/** @package */
export const Account = ({ session }: { session: Session }) => {
  const supabase = useSupabaseClient<Database>();
  const user = useUser();
  const [isLoading, setIsLoading] = useState(true);
  const [username, setUsername] = useState<Profiles["username"]>(null);
  const [website, setWebsite] = useState<Profiles["website"]>(null);
  const [avatar_url, setAvatarUrl] = useState<Profiles["avatar_url"]>(null);

  const getProfile = useCallback(async () => {
    try {
      setIsLoading(true);
      if (!user) throw new Error("No user");

      const { data, error, status } = await supabase
        .from("profiles")
        .select(`username, website, avatar_url`)
        .eq("id", user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setUsername(data.username);
        setWebsite(data.website);
        setAvatarUrl(data.avatar_url);
      }
    } catch (error) {
      alert("Error loading user data!");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [supabase, user]);

  async function updateProfile({
    username,
    website,
    avatar_url,
  }: {
    username: Profiles["username"];
    website: Profiles["website"];
    avatar_url: Profiles["avatar_url"];
  }) {
    try {
      setIsLoading(true);
      if (!user) throw new Error("No user");

      const updates = {
        id: user.id,
        username,
        website,
        avatar_url,
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase.from("profiles").upsert(updates);
      if (error) throw error;
      alert("Profile updated!");
    } catch (error) {
      alert("Error updating the data!");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getProfile().catch(() => console.error("something went wrong in useEffect by usin getProfile."));
  }, [session, getProfile]);

  return (
    <div className="bg-gray-500 p-10 text-white">
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" type="text" value={session.user.email} disabled />
      </div>

      <div>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          value={username || ""}
          onChange={(e) => setUsername(e.target.value)}
          className="text-black"
        />
      </div>
      <div>
        <label htmlFor="website">Website</label>
        <input
          id="website"
          type="website"
          value={website || ""}
          onChange={(e) => setWebsite(e.target.value)}
          className="text-black"
        />
      </div>

      <div className="mt-10 space-x-2">
        <button
          className="rounded-md px-4 py-1 text-gray-700"
          onClick={() => updateProfile({ username, website, avatar_url })}
          disabled={isLoading}
        >
          {isLoading ? "Loading ..." : "Update"}
        </button>

        <button className="rounded-md px-4 py-1 text-gray-700" onClick={() => supabase.auth.signOut()}>
          Sign Out
        </button>
      </div>
    </div>
  );
};

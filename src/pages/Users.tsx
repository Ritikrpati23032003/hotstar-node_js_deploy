import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Users as UsersIcon, Mail, Calendar } from "lucide-react";
import Navbar from "@/components/Navbar";

interface User {
  id: number;
  username: string;
  email: string;
  created_at?: string;
}

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/users");
      setUsers(res.data);
    } catch (err: any) {
      toast.error(err.response?.data?.error || "Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const getInitials = (username: string) => {
    return username
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-28 pb-16">
        <div className="mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Community
          </h1>
          <p className="text-muted-foreground text-lg">
            Meet our streaming community members
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="glass-effect border-border/50 animate-pulse">
                <CardHeader>
                  <div className="h-20 bg-muted rounded" />
                </CardHeader>
                <CardContent>
                  <div className="h-4 bg-muted rounded mb-2" />
                  <div className="h-4 bg-muted rounded w-2/3" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : users.length === 0 ? (
          <Card className="glass-effect border-border/50 p-12 text-center">
            <UsersIcon className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-xl font-bold mb-2">No Users Yet</h3>
            <p className="text-muted-foreground">
              Be the first to join our streaming community!
            </p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {users.map((user, index) => (
              <Card 
                key={user.id}
                className="glass-effect border-border/50 hover:border-primary/50 transition-smooth hover:shadow-glow animate-in fade-in slide-in-from-bottom-4 duration-700"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16 border-2 border-primary/50">
                      <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-primary-foreground text-xl font-bold">
                        {getInitials(user.username)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <CardTitle className="text-xl">{user.username}</CardTitle>
                      <Badge variant="secondary" className="mt-1">
                        Premium Member
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    <span className="truncate">{user.email}</span>
                  </div>
                  {user.created_at && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>Joined {new Date(user.created_at).toLocaleDateString()}</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {users.length > 0 && (
          <div className="mt-8 text-center">
            <Card className="glass-effect border-border/50 inline-block px-8 py-4">
              <p className="text-lg">
                <span className="font-bold text-primary text-2xl">{users.length}</span>{" "}
                <span className="text-muted-foreground">
                  {users.length === 1 ? "Member" : "Members"} in our community
                </span>
              </p>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Users;

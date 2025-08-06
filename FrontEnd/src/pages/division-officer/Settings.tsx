
// import React from "react";
// import { useOutletContext } from "react-router-dom";
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { Switch } from "@/components/ui/switch";
// import { toast } from "sonner";
// import { Category } from "@/types";

// interface DashboardContextType {
//   currentCategoryId: string;
//   currentCategory: Category | undefined;
//   currentMenu: string;
// }

// const Settings: React.FC = () => {
//   const { currentCategory } = useOutletContext<DashboardContextType>();
  
//   // Mock user data - in a real app this would come from an API
//   const [userSettings, setUserSettings] = React.useState({
//     name: "John Doe",
//     email: "john.doe@agri.gov.lk",
//     phone: "071-1234567",
//     office: "Kandy Central Division",
//     bio: "Division Agricultural Officer with 5 years of experience.",
//     notifications: {
//       email: true,
//       sms: false,
//       newFarmer: true,
//       newLand: true,
//       approvals: true
//     }
//   });

//   const handleSaveProfile = (e: React.FormEvent) => {
//     e.preventDefault();
//     toast.success("Profile settings updated successfully");
//   };

//   const handleSaveNotifications = (e: React.FormEvent) => {
//     e.preventDefault();
//     toast.success("Notification preferences updated successfully");
//   };

//   return (
//     <div className="space-y-6">
//       <Card>
//         <CardHeader>
//           <CardTitle>Profile Settings</CardTitle>
//           <CardDescription>
//             Manage your account details and preferences
//           </CardDescription>
//         </CardHeader>
//         <form onSubmit={handleSaveProfile}>
//           <CardContent className="space-y-4">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div className="space-y-2">
//                 <Label htmlFor="name">Full Name</Label>
//                 <Input 
//                   id="name" 
//                   value={userSettings.name}
//                   onChange={(e) => setUserSettings({...userSettings, name: e.target.value})}
//                 />
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="email">Email</Label>
//                 <Input 
//                   id="email" 
//                   type="email" 
//                   value={userSettings.email}
//                   onChange={(e) => setUserSettings({...userSettings, email: e.target.value})}
//                 />
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="phone">Phone Number</Label>
//                 <Input 
//                   id="phone" 
//                   value={userSettings.phone}
//                   onChange={(e) => setUserSettings({...userSettings, phone: e.target.value})}
//                 />
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="office">Office</Label>
//                 <Input 
//                   id="office" 
//                   value={userSettings.office}
//                   readOnly 
//                   disabled
//                 />
//               </div>
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="bio">Bio</Label>
//               <Textarea 
//                 id="bio" 
//                 rows={4}
//                 value={userSettings.bio}
//                 onChange={(e) => setUserSettings({...userSettings, bio: e.target.value})}
//               />
//             </div>
//           </CardContent>
//           <CardFooter>
//             <Button type="submit">Save Profile</Button>
//           </CardFooter>
//         </form>
//       </Card>

//       <Card>
//         <CardHeader>
//           <CardTitle>Notification Settings</CardTitle>
//           <CardDescription>
//             Manage how you receive notifications
//           </CardDescription>
//         </CardHeader>
//         <form onSubmit={handleSaveNotifications}>
//           <CardContent className="space-y-4">
//             <div className="space-y-4">
//               <div className="flex items-center justify-between">
//                 <div className="space-y-0.5">
//                   <Label>Email Notifications</Label>
//                   <p className="text-sm text-muted-foreground">
//                     Receive notifications via email
//                   </p>
//                 </div>
//                 <Switch 
//                   checked={userSettings.notifications.email}
//                   onCheckedChange={(checked) => 
//                     setUserSettings({
//                       ...userSettings, 
//                       notifications: {...userSettings.notifications, email: checked}
//                     })
//                   }
//                 />
//               </div>
//               <div className="flex items-center justify-between">
//                 <div className="space-y-0.5">
//                   <Label>SMS Notifications</Label>
//                   <p className="text-sm text-muted-foreground">
//                     Receive notifications via SMS
//                   </p>
//                 </div>
//                 <Switch 
//                   checked={userSettings.notifications.sms}
//                   onCheckedChange={(checked) => 
//                     setUserSettings({
//                       ...userSettings, 
//                       notifications: {...userSettings.notifications, sms: checked}
//                     })
//                   }
//                 />
//               </div>
//             </div>
//             <div className="border-t pt-4">
//               <h3 className="text-sm font-medium mb-3">Notification Types</h3>
//               <div className="space-y-4">
//                 <div className="flex items-center justify-between">
//                   <Label>New Farmer Registrations</Label>
//                   <Switch 
//                     checked={userSettings.notifications.newFarmer}
//                     onCheckedChange={(checked) => 
//                       setUserSettings({
//                         ...userSettings, 
//                         notifications: {...userSettings.notifications, newFarmer: checked}
//                       })
//                     }
//                   />
//                 </div>
//                 <div className="flex items-center justify-between">
//                   <Label>New Land Registrations</Label>
//                   <Switch 
//                     checked={userSettings.notifications.newLand}
//                     onCheckedChange={(checked) => 
//                       setUserSettings({
//                         ...userSettings, 
//                         notifications: {...userSettings.notifications, newLand: checked}
//                       })
//                     }
//                   />
//                 </div>
//                 <div className="flex items-center justify-between">
//                   <Label>Approval Requests</Label>
//                   <Switch 
//                     checked={userSettings.notifications.approvals}
//                     onCheckedChange={(checked) => 
//                       setUserSettings({
//                         ...userSettings, 
//                         notifications: {...userSettings.notifications, approvals: checked}
//                       })
//                     }
//                   />
//                 </div>
//               </div>
//             </div>
//           </CardContent>
//           <CardFooter>
//             <Button type="submit">Save Notification Settings</Button>
//           </CardFooter>
//         </form>
//       </Card>
//     </div>
//   );
// };

// export default Settings;

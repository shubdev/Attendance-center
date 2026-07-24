import { FaUsers } from "react-icons/fa";
import { useOutletContext } from "react-router-dom";

function UserDirectory() {

  const { usersRes: users } = useOutletContext();
  
  return (users &&
    <div className="relative p-6 lg:p-8 rounded-3xl bg-gradient-to-br from-[#4b7996]/95 via-[#376380]/90 to-[#224863]/95 text-white border border-white/30 backdrop-blur-2xl shadow-[0_20px_60px_rgba(15,35,55,0.35)] animate-in fade-in slide-in-from-bottom-4 duration-500 overflow-hidden">
      {/* Soft background ambient glows */}
      <div className="absolute -top-24 -left-24 w-72 h-72 bg-sky-400/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="flex items-center justify-between mb-6 relative z-10">
        <h3 className="text-2xl font-extrabold text-white flex items-center gap-3 drop-shadow-sm">
          <div className="text-white/80">
            <FaUsers size={22} />
          </div>
          Employee Directory
        </h3>
      </div>
      <div className="overflow-x-auto rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md shadow-2xl relative z-10">
        <table className="w-full text-left text-sm border-collapse whitespace-nowrap">
          <thead className="bg-white/15 border-b border-white/20">
            <tr className="text-white/80">
              <th className="py-4 px-5 font-bold uppercase tracking-wider text-xs">User Details</th>
              <th className="py-4 px-5 font-bold uppercase tracking-wider text-xs">Email Address</th>
              <th className="py-4 px-5 font-bold uppercase tracking-wider text-xs">Company Role</th>
              <th className="py-4 px-5 font-bold uppercase tracking-wider text-xs">Direct Manager</th>
              <th className="py-4 px-5 font-bold uppercase tracking-wider text-xs">Account Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {users?.map((user) => (
              <tr onClick={() => console.log(user)} key={user._id} className="hover:bg-white/10 transition-colors duration-150 cursor-pointer">
                <td className="py-4 px-5 font-bold text-white">{user.name}</td>
                <td className="py-4 px-5 text-white/80 font-medium">{user.email}</td>
                <td className="py-4 px-5">
                  <span className="capitalize px-3 py-1 rounded-full bg-white/20 text-white font-black text-[11px] uppercase tracking-wider shadow-sm">
                    {user.role}
                  </span>
                </td>
                <td className="py-4 px-5">
                  {user.manager ? (
                    <div className="flex flex-col">
                      <span className="font-bold text-white">{user.manager.name}</span>
                      <span className="text-[11px] font-medium text-white/70">{user.manager.email}</span>
                    </div>
                  ) : (
                    <span className="text-white/50 font-medium italic">None</span>
                  )}
                </td>
                <td className="py-4 px-5">
                  <span className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-wider text-emerald-300 bg-emerald-500/20 px-3 py-1 rounded-full border border-emerald-500/30 shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span> Active
                  </span>
                </td>
              </tr>
            ))}
            {!users?.length && (
              <tr>
                <td colSpan="5" className="py-12 text-center text-white/60 font-medium">
                  No users loaded.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserDirectory;

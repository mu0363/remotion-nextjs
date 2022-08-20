import { CustomNextPage } from "next";
import { DashboardLayout } from "src/layout/DashboardLayout";

const Dashboard: CustomNextPage = () => {
  return (
    <div>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem, ipsa inventore a fuga minus quam corrupti earum
      veniam qui voluptas magnam magni, architecto, tenetur cumque enim perferendis quae recusandae dolorum. Lorem ipsum
      dolor sit amet consectetur adipisicing elit. Rem, ipsa inventore a fuga minus quam corrupti earum veniam qui
      voluptas magnam magni, architecto, tenetur cumque enim perferendis quae recusandae dolorum.
    </div>
  );
};

Dashboard.getLayout = DashboardLayout;

export default Dashboard;

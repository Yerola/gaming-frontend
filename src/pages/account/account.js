import { useState } from "react";
import {signOut } from "next-auth/react";
import { ChatbotGaming } from '@/components/Chatbot';
import { ListUsers } from "@/components/Users";
import { Tab } from "semantic-ui-react";
import { useRouter } from "next/router";
import { BasicLayout } from "@/layouts";
import { useAuth } from "@/hooks";
import {
  Info,
  Settings,
  Address,
  Wishlist,
  Orders,
  Sales
} from "@/components/Account";
import { Separator, Seo } from "@/components/Shared";
import styles from "./account.module.scss";
import {
  Games,
  /*   Settings, */
} from "@/components/Dashboard";
import { render } from "react-dom";

export default function AccountPage() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [reload, setReload] = useState(false);

  if (!user) {
    router.push("/");
    return null;
  }
  const exit=async()=>{
    await signOut()
    logout()
  }
  const onReload = () => setReload((prevState) => !prevState);

  let panes = user.role?[
    user.role && {
      menuItem: "Ventas",
      render: () => (
        <Tab.Pane attached={false}>
          <Sales/>
          <Separator height={80} />
        </Tab.Pane>
      ),
    },
    user.role && { 
      menuItem: "Usuarios",
      render: () => (
        <Tab.Pane attached={false}>
          <ListUsers reload={reload} onReload={onReload} />
          <Separator height={80} />
        </Tab.Pane>
      ),
    },
    user.role && {
      menuItem: { key: 20, content: "Video Games" },
      render: () => (
        <Tab.Pane attached={false}>
          <Games.AddGame onReload={onReload} />
          <Games.ListGames reload={reload} onReload={onReload} />
          <Separator height={80} />
        </Tab.Pane>
      ),
    },
  ]:
  [
    {
      menuItem: "Mis pedidos",
      render: () => (
        <Tab.Pane attached={false}>
          <Orders />
          <Separator height={80} />
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Lista de deseos",
      render: () => (
        <Tab.Pane attached={false}>
          <Wishlist />
          <Separator height={80} />
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Direcciones",
      render: () => (
        <Tab.Pane attached={false}>
          <Address.AddAddress onReload={onReload} />
          <Address.ListAddresses reload={reload} onReload={onReload} />
          <Separator height={80} />
        </Tab.Pane>
      ),
    },
  ];

  panes =[...panes,
    {
      menuItem: { key: 21, icon: "settings", content: "Ajustes" },
      render: () => (
        <Tab.Pane attached={false} key={99}>
          <Settings.ChangeNameForm />
          <div className={styles.containerForms}>
            <Settings.ChangeEmailForm />
            <Settings.ChangePasswordForm />
          </div>
          <Separator height={80} />
        </Tab.Pane>
      ),
    },
    {
      menuItem: {
        key: 22,
        icon: "log out",
        content: "",
        onClick: exit,
      },
    }]

  return (
    <div className={styles.containerd}>
      <Seo title="Mi cuenta" />

      <BasicLayout isContainer relative className={styles.content} >
        <Info />

        <Tab
          menu={{ secondary: true, pointing: true }}
          panes={panes}
          className={styles.tabs}
        />

        <ChatbotGaming />
      </BasicLayout>
    </div>
  );
}

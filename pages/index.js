import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useEffect, useState } from "react";
import LoginWithMagicLinks from './components/LoginWithMagicLinks';
import withSession from './lib/withSession';
import { useRouter } from 'next/router'

const stytchPublicToken = process.env.NEXT_PUBLIC_STYTCH_PUBLIC_TOKEN

const sdkStyle = {
    fontFamily: '"Helvetica New", Helvetica, sans-serif',
    primaryColor: '#19303d',
    primaryTextColor: '#090909',
    width: '321px',
    hideHeaderText: true,
};

const callbacks = {
    onEvent: (data) => {
    // TODO: check whether the user exists in your DB
        if (data.eventData.type === 'USER_EVENT_TYPE') {
        console.log({
            userId: data.eventData.userId,
            email: data.eventData.email,
        });
        }
    },
    onSuccess: (data) => console.log(data),
    onError: (data) => console.log(data),
};

export default function Home(props) {
    const [clientProjects, setClientProjects] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const { user_id, email } = props.user
    
    const router = useRouter()

    // Gets this client's projects when they're logged in
    const getClientProjects = async () => {
            const resp = await fetch("/api/projects", {
                headers: { Authorization: `Bearer ${email}` },
            });
            setClientProjects(await resp.json());
    };

    // Sets local isLoggedIn variable
    useEffect(() => {
        if (user_id) {
            setIsLoggedIn(true);
            getClientProjects();
        }
    }, []);

    // Deletes Access Token and logs user out
    const logOut = async ()  => {
        setIsLoggedIn(false);
        
        const resp = await fetch('/api/logout', { method: 'POST' });
        if (resp.status === 200) {
            router.push('/');
        }
    };

    // Allow clients to mark a project as complete
    const markProjectComplete = async (e) => {
        const completeProjectId = e.target.value;
        setClientProjects(clientProjects.map(project => {
            if (project.id === completeProjectId) {
                project.complete = true;
            }
            return project
        }));

        const token = localStorage.getItem("ACCESS_TOKEN");
        await fetch("/api/projects/" + completeProjectId, {
            headers: { Authorization: `Bearer ${token}` },
            method: "PUT",
        });
    };

    // Display the client portal page
    return (
        <div className={styles.container}>
            <Head>
                <title>Client Portal</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <main className={styles.main}>
                <h1 className={styles.title}>Welcome to Your Client Portal</h1>
                {isLoggedIn ? (
                    <div>
                        {clientProjects ? (
                            <div className={styles.grid}>
                                {clientProjects.map(project =>
                                    <div className={styles.card} key={project.id}>
                                        <h3>{project.name}</h3>
                                        <img src={project.project_images[0]} style={{maxWidth: "100%"}} />
                                        <p>Led by {project.project_lead.name}</p>
                                        <p>Due on {project.due_date.split('T')[0]}</p>
                                        <p><input type="checkbox"
                                                  name="complete"
                                                  value={project.id}
                                                  onChange={markProjectComplete}
                                                  disabled={project.complete}
                                                  defaultChecked={!!project.complete} /> Project complete</p>
                                    </div>
                                )}
                            </div>
                        ) : (<p>You currently have no projects attached to this account.</p>)}
                        <p style={{textAlign: "center", cursor: "pointer"}} onClick={logOut}>Log Out</p>
                    </div>
                ): (<LoginWithMagicLinks styles={styles} sdkStyle={sdkStyle} publicToken={stytchPublicToken} callbacks={callbacks} />)}
                <div id="cotter-form-container" style={{ width: 300, height: 200 }} />
            </main>
        </div>
    )
}

const getServerSidePropsHandler = async ({ req }) => {
    // Get the user's session based on the request
    const user = req.session.get('user') ?? null;
    const props = { user } ;
    return { props };
  };
  
export const getServerSideProps = withSession(getServerSidePropsHandler);
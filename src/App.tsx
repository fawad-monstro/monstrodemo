import { useAppStore } from './store/useAppStore';
import { DemoBar } from './components/layout/DemoBar';
import { HostBar } from './components/layout/HostBar';
import { StandaloneBar } from './components/layout/StandaloneBar';
import { Sidebar } from './components/layout/Sidebar';
import { Toast } from './components/ui/Toast';
import { TodayScreen } from './components/screens/TodayScreen';
import { GuidanceScreen } from './components/screens/GuidanceScreen';
import { MonitoringScreen } from './components/screens/MonitoringScreen';
import { DataQueueScreen } from './components/screens/DataQueueScreen';
import { DataSourcesScreen } from './components/screens/DataSourcesScreen';
import { VaultScreen } from './components/screens/VaultScreen';
import { ConnectWidget } from './components/modals/ConnectWidget';
import { QuestionPackModal } from './components/modals/QuestionPackModal';
import { RequestModal } from './components/modals/RequestModal';
import { GuidanceActionModal } from './components/modals/GuidanceActionModal';
import { NewsArticleModal } from './components/modals/NewsArticleModal';
import { MonitoringDetailModal } from './components/modals/MonitoringDetailModal';
import { GoalDetailModal } from './components/modals/GoalDetailModal';
import { PersonDetailModal } from './components/modals/PersonDetailModal';
import { SourceDetailModal } from './components/modals/SourceDetailModal';
import { VideoPlayerModal } from './components/modals/VideoPlayerModal';
import { DecisionTreeModal } from './components/modals/DecisionTreeModal';
import { AddAssetModal } from './components/modals/AddAssetModal';

export default function App() {
  const embedded = useAppStore(s => s.embedded);
  const fidelity = useAppStore(s => s.fidelity);
  const tab = useAppStore(s => s.tab);

  return (
    <div
      data-theme={fidelity === 'dark' ? 'dark' : 'light'}
      className={fidelity === 'wire' ? 'wire-mode' : ''}
      style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'var(--c-page)' }}
    >
      <DemoBar />
      <div style={{
        paddingTop: 50,
        flex: 1,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        overflowY: 'auto',
        background: '#D8D8DA',
      }}>
        <div style={{
          width: '100%',
          maxWidth: 1180,
          margin: '20px auto',
          borderRadius: 30,
          background: '#0A0A0A',
          padding: 3,
          boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
        }}>
          <div style={{
            borderRadius: 22,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            background: 'var(--c-page)',
            minHeight: 700,
          }}>
            {embedded && <HostBar />}
            {!embedded && <StandaloneBar />}
            <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
              <Sidebar />
              <main style={{ flex: 1, overflowY: 'auto', background: 'var(--c-page)' }}>
                {tab === 'today' && <TodayScreen />}
                {tab === 'guidance' && <GuidanceScreen />}
                {tab === 'monitoring' && <MonitoringScreen />}
                {tab === 'queue' && <DataQueueScreen />}
                {tab === 'connected' && <DataSourcesScreen />}
                {tab === 'vault' && <VaultScreen />}
              </main>
            </div>
          </div>
        </div>
        <Toast />
      </div>
      <ConnectWidget />
      <QuestionPackModal />
      <RequestModal />
      <GuidanceActionModal />
      <NewsArticleModal />
      <MonitoringDetailModal />
      <GoalDetailModal />
      <PersonDetailModal />
      <SourceDetailModal />
      <VideoPlayerModal />
      <DecisionTreeModal />
      <AddAssetModal />
    </div>
  );
}

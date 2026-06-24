import { useAppStore } from './store/useAppStore';
import { useBreakpoint } from './hooks/useBreakpoint';
import { useIsTauri } from './hooks/useIsTauri';
import { useSwipeBack } from './hooks/useSwipeBack';
import { DemoBar } from './components/layout/DemoBar';
import { MobileDemoBar } from './components/layout/MobileDemoBar';
import { HostBar } from './components/layout/HostBar';
import { StandaloneBar } from './components/layout/StandaloneBar';
import { Sidebar } from './components/layout/Sidebar';
import { BottomNav } from './components/layout/BottomNav';
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
  const embedded    = useAppStore(s => s.embedded);
  const fidelity    = useAppStore(s => s.fidelity);
  const tab         = useAppStore(s => s.tab);
  const detail      = useAppStore(s => s.detail);
  const vaultCat    = useAppStore(s => s.vaultCat);
  const vaultItem   = useAppStore(s => s.vaultItem);
  const closeDetail = useAppStore(s => s.closeDetail);
  const vaultBack   = useAppStore(s => s.vaultBack);

  const bp      = useBreakpoint();
  const isTauri = useIsTauri();
  const isPhone  = bp === 'phone';

  // Stage frame only makes sense in the native Tauri window at full desktop size
  const useStageFrame = isTauri && bp === 'desktop';

  // Swipe-back for vault/guidance drill-down
  const canSwipeBack = (tab === 'guidance' && detail !== null) ||
    (tab === 'vault' && (vaultCat !== null || vaultItem !== null));
  useSwipeBack(() => {
    if (tab === 'guidance' && detail !== null) closeDetail();
    else if (tab === 'vault') vaultBack();
  }, canSwipeBack);

  const demoBarH = isPhone ? 44 : 50;

  const screenContent = (
    <>
      {embedded ? <HostBar /> : <StandaloneBar />}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        {!isPhone && <Sidebar />}
        <main
          className="scroll-area"
          style={{
            flex: 1,
            overflowY: 'auto',
            background: 'var(--c-page)',
            paddingBottom: isPhone ? 'calc(56px + env(safe-area-inset-bottom))' : undefined,
          }}
        >
          {tab === 'today'      && <TodayScreen />}
          {tab === 'guidance'   && <GuidanceScreen />}
          {tab === 'monitoring' && <MonitoringScreen />}
          {tab === 'queue'      && <DataQueueScreen />}
          {tab === 'connected'  && <DataSourcesScreen />}
          {tab === 'vault'      && <VaultScreen />}
        </main>
      </div>
      {isPhone && <BottomNav />}
    </>
  );

  return (
    <div
      data-theme={fidelity === 'dark' ? 'dark' : 'light'}
      className={`no-select${fidelity === 'wire' ? ' wire-mode' : ''}`}
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: useStageFrame ? '#D8D8DA' : 'var(--c-page)',
      }}
    >
      {isPhone ? <MobileDemoBar /> : <DemoBar />}

      {useStageFrame ? (
        /* ── Tauri native desktop: iPad-style stage frame ── */
        <div style={{
          paddingTop: demoBarH,
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
              {screenContent}
            </div>
          </div>
        </div>
      ) : (
        /* ── Browser / tablet / phone: full-screen responsive ── */
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          paddingTop: demoBarH,
          background: 'var(--c-page)',
        }}>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            {screenContent}
          </div>
        </div>
      )}

      <Toast />
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

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="prose max-w-none">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">개인정보처리방침</h1>
          
          <div className="text-gray-600 space-y-6">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">1. 개인정보의 처리목적</h2>
              <p>
                ryuin은 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는 개인정보보호법 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.
              </p>
              <ul className="list-disc list-inside mt-3 space-y-1">
                <li>웹사이트 제작 서비스 제공 및 계약 이행</li>
                <li>고객 문의 및 상담 응대</li>
                <li>서비스 개선 및 맞춤형 서비스 제공</li>
                <li>마케팅 및 광고에의 활용</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">2. 개인정보의 처리 및 보유기간</h2>
              <p>
                ryuin은 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 수집 시에 동의받은 개인정보 보유·이용기간 내에서 개인정보를 처리·보유합니다.
              </p>
              <ul className="list-disc list-inside mt-3 space-y-1">
                <li>서비스 이용 기록: 3년 (전자상거래 등에서의 소비자보호에 관한 법률)</li>
                <li>고객 상담 기록: 3년</li>
                <li>마케팅 동의 정보: 동의 철회 시까지</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">3. 개인정보의 제3자 제공</h2>
              <p>
                ryuin은 개인정보를 원칙적으로 외부에 제공하지 않습니다. 다만, 아래의 경우에는 예외로 합니다.
              </p>
              <ul className="list-disc list-inside mt-3 space-y-1">
                <li>정보주체가 사전에 동의한 경우</li>
                <li>법령의 규정에 의거하거나, 수사 목적으로 법령에 정해진 절차와 방법에 따라 수사기관의 요구가 있는 경우</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">4. 정보주체의 권리·의무 및 행사방법</h2>
              <p>
                정보주체는 ryuin에 대해 언제든지 다음 각 호의 개인정보 보호 관련 권리를 행사할 수 있습니다.
              </p>
              <ul className="list-disc list-inside mt-3 space-y-1">
                <li>개인정보 처리현황 통지요구</li>
                <li>오류 등이 있을 경우 정정·삭제 요구</li>
                <li>처리정지 요구</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">5. 개인정보보호책임자</h2>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p><strong>개인정보보호책임자:</strong> ryuin 대표</p>
                <p><strong>연락처:</strong> contact@ryuin.studio</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">6. 개인정보 처리방침 변경</h2>
              <p>
                이 개인정보처리방침은 시행일로부터 적용되며, 법령 및 방침에 따른 변경내용의 추가, 삭제 및 정정이 있는 경우에는 변경사항의 시행 7일 전부터 공지사항을 통하여 고지할 것입니다.
              </p>
            </section>

            <div className="mt-8 pt-6 border-t border-gray-200 text-sm text-gray-500">
              <p>본 방침은 2025년 1월 1일부터 시행됩니다.</p>
            </div>
          </div>
        </div>
      </div>

      <Footer theme="light" />
    </main>
  );
} 
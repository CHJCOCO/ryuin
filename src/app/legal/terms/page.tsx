import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="prose max-w-none">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">이용약관</h1>
          
          <div className="text-gray-600 space-y-6">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">제1조 (목적)</h2>
              <p>
                이 약관은 ryuin(이하 &quot;회사&quot;)이 제공하는 웹사이트 제작 서비스(이하 &quot;서비스&quot;)의 이용과 관련하여 회사와 이용자의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">제2조 (정의)</h2>
              <p>이 약관에서 사용하는 용어의 정의는 다음과 같습니다.</p>
              <ul className="list-disc list-inside mt-3 space-y-1">
                <li><strong>&quot;서비스&quot;</strong>란 회사가 제공하는 웹사이트 제작, 개발, 유지보수 등의 모든 서비스를 의미합니다.</li>
                <li><strong>&quot;이용자&quot;</strong>란 회사의 서비스를 이용하는 개인 또는 법인을 의미합니다.</li>
                <li><strong>&quot;계약&quot;</strong>이란 회사와 이용자 간에 체결되는 서비스 제공에 관한 약정을 의미합니다.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">제3조 (약관의 효력 및 변경)</h2>
              <p>
                이 약관은 서비스를 이용하고자 하는 모든 이용자에게 그 효력이 발생합니다. 회사는 필요한 경우 이 약관을 변경할 수 있으며, 변경된 약관은 웹사이트에 공지함으로써 효력이 발생합니다.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">제4조 (서비스의 제공)</h2>
              <p>회사는 다음과 같은 서비스를 제공합니다.</p>
              <ul className="list-disc list-inside mt-3 space-y-1">
                <li>웹사이트 기획 및 디자인</li>
                <li>웹사이트 개발 및 구축</li>
                <li>반응형 웹사이트 제작</li>
                <li>쇼핑몰 및 전자상거래 솔루션</li>
                <li>웹사이트 유지보수 및 관리</li>
                <li>기타 웹 관련 서비스</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">제5조 (계약의 성립)</h2>
              <p>
                서비스 계약은 이용자의 서비스 신청과 회사의 승낙으로 성립됩니다. 회사는 다음 각 호에 해당하는 경우 서비스 제공을 거절할 수 있습니다.
              </p>
              <ul className="list-disc list-inside mt-3 space-y-1">
                <li>기술적으로 서비스 제공이 불가능한 경우</li>
                <li>이용자가 제공한 정보가 허위인 경우</li>
                <li>법령에 위반되거나 사회의 안녕질서, 미풍양속을 저해하는 내용의 경우</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">제6조 (서비스 이용료 및 결제)</h2>
              <p>
                서비스 이용료는 개별 계약에서 정한 바에 따릅니다. 이용자는 계약에서 정한 기일 내에 서비스 이용료를 지급해야 합니다.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">제7조 (회사의 의무)</h2>
              <ul className="list-disc list-inside space-y-1">
                <li>회사는 계약에서 정한 서비스를 성실히 제공해야 합니다.</li>
                <li>회사는 이용자의 개인정보를 보호하기 위해 개인정보보호법 등 관련 법령을 준수합니다.</li>
                <li>회사는 서비스에 결함이 있는 경우 이를 수정하기 위해 노력합니다.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">제8조 (이용자의 의무)</h2>
              <ul className="list-disc list-inside space-y-1">
                <li>이용자는 계약에서 정한 의무를 성실히 이행해야 합니다.</li>
                <li>이용자는 서비스 이용료를 기일 내에 지급해야 합니다.</li>
                <li>이용자는 서비스 이용 시 관련 법령을 준수해야 합니다.</li>
                <li>이용자는 서비스 제공에 필요한 자료를 성실히 제공해야 합니다.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">제9조 (서비스의 중단)</h2>
              <p>
                회사는 컴퓨터 등 정보통신설비의 보수점검, 교체 및 고장, 통신의 두절 등의 사유가 발생한 경우에는 서비스의 제공을 일시적으로 중단할 수 있습니다.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">제10조 (계약의 해지)</h2>
              <p>
                이용자 또는 회사는 상대방이 계약상의 의무를 위반한 경우 계약을 해지할 수 있습니다. 계약 해지 시에는 7일 전에 상대방에게 통지해야 합니다.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">제11조 (손해배상)</h2>
              <p>
                회사 또는 이용자는 상대방의 고의 또는 중과실로 인하여 손해를 입은 경우 손해배상을 청구할 수 있습니다. 다만, 회사의 배상책임은 이용자가 지급한 서비스 이용료를 초과하지 않습니다.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">제12조 (분쟁해결)</h2>
              <p>
                서비스 이용으로 발생한 분쟁에 대해 소송이 제기되는 경우 회사의 본사 소재지를 관할하는 법원을 관할 법원으로 합니다.
              </p>
            </section>

            <div className="mt-8 pt-6 border-t border-gray-200 text-sm text-gray-500">
              <p>본 약관은 2025년 1월 1일부터 시행됩니다.</p>
            </div>
          </div>
        </div>
      </div>

      <Footer theme="light" />
    </main>
  );
} 
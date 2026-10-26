import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, type LegalSection } from "@/components/shared/legal-page";
import { siteConfig } from "@/config/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Kebijakan Privasi",
  description:
    "Kebijakan privasi CITRAVA: data apa yang dikumpulkan melalui formulir kontak, bagaimana data digunakan, dan hak Anda.",
  path: "/privacy",
});

const sections: LegalSection[] = [
  {
    id: "pendahuluan",
    heading: "Pendahuluan",
    body: (
      <p>
        Kebijakan ini menjelaskan bagaimana {siteConfig.name} menangani informasi
        yang Anda kirimkan melalui situs ini. Dokumen ini masih berupa contoh
        untuk prototipe dan akan diperbarui sebelum situs diluncurkan secara
        resmi.
      </p>
    ),
  },
  {
    id: "data-yang-dikumpulkan",
    heading: "Data yang dikumpulkan",
    body: (
      <>
        <p>
          Formulir kontak meminta nama, alamat email, nomor telepon, subjek, dan
          isi pesan. Kami tidak meminta data sensitif seperti informasi kesehatan,
          data keuangan, atau nomor identitas.
        </p>
        <ul>
          <li>Nama, untuk mengetahui kepada siapa kami membalas.</li>
          <li>Email dan telepon, untuk menindaklanjuti pesan Anda.</li>
          <li>Subjek dan isi pesan, untuk memahami kebutuhan Anda.</li>
        </ul>
      </>
    ),
  },
  {
    id: "penggunaan",
    heading: "Bagaimana data digunakan",
    body: (
      <p>
        Data yang Anda kirimkan hanya digunakan untuk merespons pertanyaan,
        permintaan informasi produk, atau rencana kerja sama. Kami tidak menjual
        data pribadi kepada pihak ketiga.
      </p>
    ),
  },
  {
    id: "status-formulir",
    heading: "Status formulir pada prototipe",
    body: (
      <p>
        Pada versi prototipe ini, formulir melakukan validasi di browser dan di
        server, tetapi <strong>belum mengirim email</strong> karena penyedia
        email belum dikonfigurasi. Pesan yang Anda kirim tidak diterima oleh tim
        secara nyata. Setelah integrasi email aktif, mekanisme penyimpanan dan
        masa retensi akan dijelaskan di bagian ini.
      </p>
    ),
  },
  {
    id: "cookie",
    heading: "Cookie dan penyimpanan lokal",
    body: (
      <p>
        Situs ini tidak menggunakan cookie iklan atau pelacak pihak ketiga.
        Penyimpanan sesi browser hanya digunakan untuk mengingat bahwa bilah
        pengumuman telah ditutup. Data tersebut tidak dikirim ke server.
      </p>
    ),
  },
  {
    id: "hak-anda",
    heading: "Hak Anda",
    body: (
      <p>
        Anda berhak meminta akses, koreksi, atau penghapusan data yang pernah
        Anda kirimkan. Untuk mengajukan permintaan, hubungi{" "}
        <a href={`mailto:${siteConfig.contact.email}`}>
          {siteConfig.contact.email}
        </a>
        . Alamat email ini masih placeholder dan akan diganti sebelum peluncuran.
      </p>
    ),
  },
  {
    id: "perubahan",
    heading: "Perubahan kebijakan",
    body: (
      <p>
        Kami dapat memperbarui kebijakan ini seiring perkembangan layanan.
        Tanggal pembaruan terakhir akan ditampilkan di bagian atas halaman.
      </p>
    ),
  },
  {
    id: "kontak",
    heading: "Kontak",
    body: (
      <p>
        Pertanyaan tentang kebijakan ini dapat disampaikan melalui{" "}
        <Link href="/contact">halaman kontak</Link> atau email di atas.
      </p>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Kebijakan Privasi"
      intro="Kami menghargai data yang Anda percayakan. Halaman ini menjelaskan informasi apa yang dikumpulkan, mengapa, dan bagaimana Anda dapat mengendalikannya."
      updated={siteConfig.legal.privacyUpdated}
      sections={sections}
      notice="Dokumen contoh untuk prototipe. Belum ditinjau oleh penasihat hukum dan belum mencerminkan praktik resmi perusahaan."
    />
  );
}

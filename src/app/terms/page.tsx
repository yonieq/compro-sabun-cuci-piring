import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, type LegalSection } from "@/components/shared/legal-page";
import { siteConfig } from "@/config/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Syarat & Ketentuan",
  description:
    "Syarat dan ketentuan penggunaan situs CITRAVA, termasuk status konten demo dan batasan informasi produk.",
  path: "/terms",
});

const sections: LegalSection[] = [
  {
    id: "penerimaan",
    heading: "Penerimaan ketentuan",
    body: (
      <p>
        Dengan mengakses situs {siteConfig.name}, Anda menyetujui ketentuan pada
        halaman ini. Jika tidak setuju, mohon tidak menggunakan situs. Dokumen
        ini merupakan contoh untuk prototipe.
      </p>
    ),
  },
  {
    id: "status-konten",
    heading: "Status konten dan data demo",
    body: (
      <>
        <p>
          Situs ini masih dalam tahap prototipe. Sebagian besar konten produk
          menggunakan data referensi demo, termasuk nama merek pihak ketiga yang
          dipakai hanya untuk menguji tata letak.
        </p>
        <ul>
          <li>Produk yang ditampilkan bukan produk resmi CITRAVA.</li>
          <li>Tidak ada harga, ketersediaan, atau kanal pembelian resmi.</li>
          <li>Semua tautan marketplace berada dalam status “segera hadir”.</li>
        </ul>
      </>
    ),
  },
  {
    id: "kekayaan-intelektual",
    heading: "Kekayaan intelektual",
    body: (
      <p>
        Nama, logo, ilustrasi, dan tata letak CITRAVA pada situs ini dibuat untuk
        prototipe. Nama merek pihak ketiga tetap milik pemegang haknya
        masing-masing dan tidak boleh ditafsirkan sebagai afiliasi, sponsor, atau
        dukungan.
      </p>
    ),
  },
  {
    id: "penggunaan-situs",
    heading: "Penggunaan situs yang diizinkan",
    body: (
      <>
        <p>Anda setuju untuk tidak:</p>
        <ul>
          <li>Menggunakan situs untuk tujuan yang melanggar hukum.</li>
          <li>Mencoba mengakses sistem atau data tanpa izin.</li>
          <li>
            Menyalin aset visual untuk kepentingan komersial tanpa izin tertulis.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "informasi-produk",
    heading: "Batasan informasi produk",
    body: (
      <p>
        Informasi pada situs ini bersifat umum dan tidak menggantikan petunjuk
        pemakaian pada kemasan produk final. CITRAVA tidak menyertakan klaim
        sertifikasi, hasil laboratorium, atau khasiat kesehatan. Selalu baca
        label produk dan gunakan sesuai petunjuk.
      </p>
    ),
  },
  {
    id: "tautan-pihak-ketiga",
    heading: "Tautan pihak ketiga",
    body: (
      <p>
        Situs dapat memuat tautan ke halaman eksternal. Kami tidak bertanggung
        jawab atas isi atau kebijakan situs pihak ketiga tersebut.
      </p>
    ),
  },
  {
    id: "pembatasan-tanggung-jawab",
    heading: "Pembatasan tanggung jawab",
    body: (
      <p>
        Situs dan kontennya disediakan “sebagaimana adanya” untuk keperluan
        prototipe. Sepanjang diizinkan hukum, {siteConfig.legalName} tidak
        bertanggung jawab atas kerugian yang timbul dari penggunaan informasi
        pada versi demo ini.
      </p>
    ),
  },
  {
    id: "hukum-yang-berlaku",
    heading: "Hukum yang berlaku",
    body: (
      <p>
        Ketentuan ini dimaksudkan untuk ditafsirkan di bawah hukum Republik
        Indonesia. Ketentuan final akan ditinjau oleh penasihat hukum sebelum
        peluncuran.
      </p>
    ),
  },
  {
    id: "hubungi",
    heading: "Menghubungi kami",
    body: (
      <p>
        Pertanyaan tentang ketentuan ini dapat disampaikan melalui{" "}
        <Link href="/contact">halaman kontak</Link>.
      </p>
    ),
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      title="Syarat & Ketentuan"
      intro="Ketentuan penggunaan situs CITRAVA, termasuk penjelasan mengenai status prototipe, konten demo, dan batasan informasi produk."
      updated={siteConfig.legal.termsUpdated}
      sections={sections}
      notice="Dokumen contoh untuk prototipe. Belum ditinjau oleh penasihat hukum dan belum mencerminkan ketentuan resmi perusahaan."
    />
  );
}

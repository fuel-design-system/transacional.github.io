import { Search, Star, ChevronDown, Home, Send, Wallet, MessageCircle } from "lucide-react";
import { FreightCard } from "@/components/FreightCard";
import freightsData from "@/data/freights.json";
import type { Freight } from "@/shared/types";
import styles from "./Index.module.scss";

export default function Index() {
  const freights = freightsData as Freight[];

  return (
    <div className={styles['page-container']}>
      {/* Mobile container */}
      <div className={styles['mobile-container']}>
        {/* Content */}
        <div className={styles.content}>
          {/* Search Bar + Avatar */}
          <div className={styles['search-section']}>
            <div className={styles['search-bar']}>
              <div className={styles['search-text']}>
                <p>Busque fretes agora</p>
              </div>
              <Search className={styles['search-icon']} />
            </div>

            {/* Avatar with badge */}
            <div className={styles['avatar-wrapper']}>
              <div className={styles.avatar}>
                <span className={styles['avatar-letter']}>A</span>
              </div>
              <svg className={styles['avatar-status']} width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="6" fill="#F4F4F5"/>
                <circle cx="8" cy="8" r="4" fill="#0C884C"/>
              </svg>
              <div className={styles['rating-badge']}>
                <Star className={styles['rating-icon']} />
                <span className={styles['rating-text']}>4.8</span>
              </div>
            </div>
          </div>

          {/* Filter Chips */}
          <div className={styles['filter-chips']}>
            <button className={styles['filter-chip']}>
              <span>Tipo de carga</span>
              <ChevronDown />
            </button>
            <button className={styles['filter-chip']}>
              <span>Veículo</span>
              <ChevronDown />
            </button>
            <button className={styles['filter-chip']}>
              <span>Carroceria</span>
              <ChevronDown />
            </button>
            <button className={styles['filter-chip']}>
              <span>Raio</span>
            </button>
          </div>

          {/* Freight Cards */}
          <div className={styles['freight-list']}>
            {freights.map((freight) => (
              <FreightCard
                key={freight.id}
                freight={freight}
                onClick={() => console.log('Clicked freight:', freight.id)}
              />
            ))}
          </div>
        </div>

        {/* Bottom Navigation - Fixed */}
        <div className={styles['bottom-nav']}>
          <div className={styles['nav-content']}>
            <button className={styles['nav-button']}>
              <Home className={`${styles['nav-icon']} ${styles.active}`} />
              <span className={`${styles['nav-label']} ${styles.active}`}>Início</span>
            </button>
            <button className={`${styles['nav-button']} ${styles.relative}`}>
              <MessageCircle className={`${styles['nav-icon']} ${styles.inactive}`} />
              <span className={`${styles['nav-label']} ${styles.inactive}`}>Chat</span>
              <div className={styles['nav-badge']}>
                <span className={styles['nav-badge-text']}>2</span>
              </div>
            </button>
            <button className={styles['nav-button']}>
              <Send className={`${styles['nav-icon']} ${styles.inactive}`} />
              <span className={`${styles['nav-label']} ${styles.inactive}`}>Viagens</span>
            </button>
            <button className={styles['nav-button']}>
              <Wallet className={`${styles['nav-icon']} ${styles.inactive}`} />
              <span className={`${styles['nav-label']} ${styles.inactive}`}>Carteira</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

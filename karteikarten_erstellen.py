
from typing import Any, Dict, List


def neukarteikarte():

    karteikarte_einfügen = """
    <div class="rounded-2xl border bg-white shadow-sm">
  <!-- Header -->
  <div class="border-b px-4 py-3">
    <div class="flex items-center gap-2">
      <span class="inline-flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-sm font-semibold text-slate-700">
        1
      </span>
      <div class="text-sm font-semibold text-slate-900">
        Karte #1
      </div>
    </div>
  </div>

  <!-- Eingabefelder -->
  <div class="grid gap-4 p-4 md:grid-cols-2">
    <div class="space-y-2">
      <label class="text-sm font-semibold text-slate-800">
        Vorderseite
      </label>
      <textarea
        class="min-h-[110px] w-full resize-y rounded-2xl border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-200"
        placeholder="Vorderseite eingeben…"
      ></textarea>
    </div>

    <div class="space-y-2">
      <label class="text-sm font-semibold text-slate-800">
        Rückseite
      </label>
      <textarea
        class="min-h-[110px] w-full resize-y rounded-2xl border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-200"
        placeholder="Rückseite eingeben…"
      ></textarea>
    </div>
  </div>

  <!-- Buttons unten -->
  <div class="flex justify-end gap-2 border-t px-4 py-3">
    <button
      type="button"
      class="rounded-xl border px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
    >
      Duplizieren
    </button>

    <button
      type="button"
      class="rounded-xl border border-rose-200 px-3 py-1.5 text-xs font-semibold text-rose-700 hover:bg-rose-50"
    >
      Löschen
    </button>
  </div>
</div>
"""
    return karteikarte_einfügen

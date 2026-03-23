import { NextResponse } from 'next/server';
import { supabaseService } from '@/domain/services/supabaseService';

export async function GET() {
  try {
    const abt = await supabaseService.getAbout();
    const certs = await supabaseService.getCertifications();
    const exps = await supabaseService.getExperiences();
    
    return NextResponse.json({
      about: abt,
      certs: certs,
      exps: exps
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
